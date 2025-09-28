<template>
  <div class="min-h-screen bg-gray-600 py-8 px-4 flex items-center justify-center">
    <div class="w-full max-w-2xl">
      <div class="bg-gray-300 rounded-2xl shadow-2xl p-8 border border-gray-400">
        
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Bloco de Notas</h1>
          <div class="h-1 w-20 bg-gray-500 mx-auto rounded"></div>
        </div>

        <div v-if="currentView === 'menu'" class="animate-fade-in">
          <div class="grid grid-cols-1 gap-4 mb-8">
            <button
              v-for="opt in options"
              :key="opt"
              @click="selectOption(opt)"
              class="bg-gray-200 hover:bg-gray-250 border border-gray-400 rounded-lg p-4 text-gray-800 font-medium transition-all duration-200 hover:shadow-md hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              <span class="text-lg">{{ getIcon(opt) }}</span>
              {{ opt }}
            </button>
          </div>
        </div>

        <div v-else-if="currentView === 'Adicionar'" class="animate-fade-in">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Nova Nota</h2>
            <div class="h-1 w-16 bg-blue-500 mx-auto rounded mb-6"></div>
          </div>

          <form @submit.prevent="addNote" class="space-y-6">
            <div>
              <label class="block text-gray-700 font-medium mb-2">Título:</label>
              <input
                v-model="form.title"
                placeholder="Digite o título..."
                class="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            
            <div>
              <label class="block text-gray-700 font-medium mb-2">Anotação:</label>
              <textarea
                v-model="form.note"
                placeholder="Digite sua anotação..."
                rows="5"
                class="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                required
              ></textarea>
            </div>

            <div class="flex gap-4 pt-4">
              <button
                type="button"
                @click="backToMenu"
                class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>←</span>
                Voltar
              </button>
              <button 
                type="submit" 
                class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                :disabled="loading"
              >
                <span v-if="loading" class="animate-spin">⏳</span>
                <span v-else>💾</span>
                {{ loading ? 'Adicionando...' : 'Adicionar' }}
              </button>
            </div>
          </form>
        </div>

        <div v-else-if="currentView === 'Ver todos'" class="animate-fade-in">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Todas as Notas</h2>
            <div class="h-1 w-16 bg-green-500 mx-auto rounded mb-6"></div>
          </div>

          <div v-if="notes.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4 text-gray-500">📝</div>
            <p class="text-gray-600 text-lg mb-2">Nenhuma nota encontrada</p>
            <p class="text-gray-500">Adicione sua primeira nota!</p>
          </div>

          <div v-else class="space-y-3 mb-6 max-h-96 overflow-y-auto pr-2">
            <div
              v-for="note in paginatedNotes"
              :key="note.id"
              class="bg-white border border-gray-400 rounded-lg p-4 transition-all hover:shadow-md hover:border-green-400 group"
            >
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h3 class="font-semibold text-gray-800 text-lg group-hover:text-green-600 transition-colors break-words overflow-hidden">
                  {{ note.title }}
                </h3>
                <button
                  @click="selectNote(note)"
                  class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap flex-shrink-0"
                >
                  <span>📋</span>
                  Mostrar
                </button>
              </div>
            </div>
          </div>

          <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 mb-4">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>←</span>
              Anterior
            </button>
            
            <span class="text-gray-700 font-medium">
              Página {{ currentPage }} de {{ totalPages }}
            </span>
            
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              Próxima
              <span>→</span>
            </button>
          </div>

          <div class="flex gap-4 pt-4 border-t border-gray-400">
            <button
              @click="backToMenu"
              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>←</span>
              Voltar
            </button>
          </div>
        </div>

        <div v-else-if="currentView === 'note-detail'" class="animate-fade-in">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Detalhes da Nota</h2>
            <div class="h-1 w-16 bg-purple-500 mx-auto rounded mb-6"></div>
          </div>

          <div v-if="selectedNote" class="bg-white border border-gray-400 rounded-lg p-6 mb-6">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold text-gray-800 break-words overflow-hidden max-w-full">{{ selectedNote.title }}</h3>
            </div>
            <p class="text-gray-700 leading-relaxed whitespace-pre-wrap break-words overflow-hidden max-w-full note-content">{{ selectedNote.note }}</p>
          </div>

          <button
            @click="backToViewAll"
            class="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>←</span>
            Voltar para a lista
          </button>
        </div>

        <div v-else-if="currentView === 'Editar'" class="animate-fade-in">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Editar Notas</h2>
            <div class="h-1 w-16 bg-yellow-500 mx-auto rounded mb-6"></div>
          </div>

          <div v-if="notes.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4 text-gray-500">✏️</div>
            <p class="text-gray-600 text-lg">Nenhuma nota para editar</p>
          </div>

          <div v-else class="space-y-3 mb-6 max-h-96 overflow-y-auto pr-2">
            <div
              v-for="n in paginatedNotes"
              :key="n.id"
              class="bg-white border border-gray-400 rounded-lg p-4 transition-all"
              :class="editId === n.id ? 'ring-2 ring-yellow-400 border-yellow-500' : 'hover:shadow-md'"
            >
              <div v-if="editId !== n.id" class="flex justify-between items-center">
                <div class="flex items-center gap-4 flex-1">
                  <h3 class="font-semibold text-gray-800 text-lg flex-1">
                    {{ n.title }}
                  </h3>
                  <button
                    @click="startEdit(n)"
                    class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>✏️</span>
                    Editar
                  </button>
                </div>
              </div>

              <div v-else class="space-y-4">
                <div>
                  <label class="block text-gray-700 font-medium mb-2">Título:</label>
                  <input
                    v-model="editForm.title"
                    class="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-2">Anotação:</label>
                  <textarea
                    v-model="editForm.note"
                    rows="3"
                    class="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
                  ></textarea>
                </div>
                <div class="flex gap-2 justify-end">
                  <button
                    @click="saveEdit(n.id!)"
                    class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                    :disabled="loading"
                  >
                    <span>💾</span>
                    {{ loading ? 'Salvando...' : 'Salvar' }}
                  </button>
                  <button
                    @click="cancelEdit"
                    class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <span>❌</span>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 mb-4">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>←</span>
              Anterior
            </button>
            
            <span class="text-gray-700 font-medium">
              Página {{ currentPage }} de {{ totalPages }}
            </span>
            
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              Próxima
              <span>→</span>
            </button>
          </div>

          <button
            @click="backToMenu"
            class="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>←</span>
            Voltar ao Menu
          </button>
        </div>

        <div v-else-if="currentView === 'Deletar'" class="animate-fade-in">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Deletar Notas</h2>
            <div class="h-1 w-16 bg-red-500 mx-auto rounded mb-6"></div>
          </div>

          <div v-if="notes.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4 text-gray-500">🗑️</div>
            <p class="text-gray-600 text-lg">Nenhuma nota para deletar</p>
          </div>

          <div v-else class="space-y-3 mb-6 max-h-96 overflow-y-auto pr-2">
            <div
              v-for="n in paginatedNotes"
              :key="n.id"
              class="bg-white border border-gray-400 rounded-lg p-4 hover:shadow-md transition-all group"
            >
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-4 flex-1">
                  <h3 class="font-semibold text-gray-800 text-lg group-hover:text-red-600 transition-colors flex-1">
                    {{ n.title }}
                  </h3>
                  <button
                    @click="deleteNote(n.id!)"
                    class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
                    :disabled="loading"
                  >
                    <span>🗑️</span>
                    {{ loading ? 'Excluindo...' : 'Excluir' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 mb-4">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>←</span>
              Anterior
            </button>
            
            <span class="text-gray-700 font-medium">
              Página {{ currentPage }} de {{ totalPages }}
            </span>
            
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              Próxima
              <span>→</span>
            </button>
          </div>

          <button
            @click="backToMenu"
            class="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>←</span>
            Voltar ao Menu
          </button>
        </div>

        <div v-if="message" :class="[
          'mt-6 p-4 rounded-lg border-l-4 flex items-center animate-fade-in',
          messageType === 'error' 
            ? 'bg-red-100 border-red-500 text-red-700' 
            : 'bg-green-100 border-green-500 text-green-700'
        ]">
          <span class="text-lg mr-3">{{ messageType === 'error' ? '❌' : '✅' }}</span>
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Note } from "../services/noteService";
import { NoteService } from "../services/noteService";

const notes = ref<Note[]>([]);
const form = ref<Note>({ title: "", note: "" });
const selectedNote = ref<Note | null>(null);
const loading = ref(false);
const message = ref("");
const messageType = ref<"success" | "error">("success");
const currentPage = ref(1);
const itemsPerPage = 5;
const editId = ref<number | null>(null);
const editForm = ref<Note>({ title: "", note: "" });
const options = ["Adicionar", "Ver todos", "Editar", "Deletar"];
const currentView = ref("menu");

const totalPages = computed(() => Math.ceil(notes.value.length / itemsPerPage));

const paginatedNotes = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return notes.value.slice(startIndex, endIndex);
});

const getIcon = (option: string) => {
  const icons: { [key: string]: string } = {
    'Adicionar': '➕',
    'Ver todos': '📋',
    'Editar': '✏️',
    'Deletar': '🗑️'
  };
  return icons[option] || '📄';
};

const selectOption = (option: string) => {
  currentView.value = option;
  if (option === 'Ver todos') {
    loadNotes();
    currentPage.value = 1;
  }
};

const backToMenu = () => {
  currentView.value = 'menu';
  selectedNote.value = null;
  editId.value = null;
  currentPage.value = 1;
};

const backToViewAll = () => {
  currentView.value = 'Ver todos';
  selectedNote.value = null;
};

const selectNote = (note: Note) => {
  selectedNote.value = note;
  currentView.value = 'note-detail';
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const showMessage = (text: string, type: "success" | "error" = "success") => {
  message.value = text;
  messageType.value = type;
  setTimeout(() => message.value = "", 4000);
};

const loadNotes = async () => {
  try {
    loading.value = true;
    const res = await NoteService.getAll();
    notes.value = res.data;
  } catch (error) {
    console.error("Erro ao carregar notas:", error);
    showMessage("Erro ao carregar notas", "error");
  } finally {
    loading.value = false;
  }
};

const addNote = async () => {
  if (!form.value.title.trim() || !form.value.note.trim()) {
    showMessage("Preencha título e anotação", "error");
    return;
  }

  try {
    loading.value = true;
    await NoteService.create(form.value);
    form.value = { title: "", note: "" };
    showMessage("Nota adicionada com sucesso!");
    backToMenu();
  } catch (error) {
    console.error("Erro ao adicionar nota:", error);
    showMessage("Erro ao adicionar nota", "error");
  } finally {
    loading.value = false;
  }
};

const startEdit = (n: Note) => {
  editId.value = n.id!;
  editForm.value = { ...n };
};

const cancelEdit = () => {
  editId.value = null;
  editForm.value = { title: "", note: "" };
};

const saveEdit = async (id: number) => {
  if (!editForm.value.title.trim() || !editForm.value.note.trim()) {
    showMessage("Preencha título e anotação", "error");
    return;
  }

  try {
    loading.value = true;
    await NoteService.update(id, editForm.value);
    showMessage("Nota atualizada com sucesso!");
    cancelEdit();
    await loadNotes();
  } catch (error) {
    console.error("Erro ao atualizar nota:", error);
    showMessage("Erro ao atualizar nota", "error");
  } finally {
    loading.value = false;
  }
};

const deleteNote = async (id: number) => {
  if (!confirm("Tem certeza que deseja excluir esta nota?")) return;

  try {
    loading.value = true;
    await NoteService.delete(id);
    showMessage("Nota excluída com sucesso!");
    await loadNotes();
  } catch (error) {
    console.error("Erro ao excluir nota:", error);
    showMessage("Erro ao excluir nota", "error");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {});
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.3s ease-out; }
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.note-content {
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
}
</style>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { height: 100%; width: 100%; }
body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #4b5563 !important;
  margin: 0;
  padding: 0;
}
#app {
  min-height: 100vh !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 2rem 1rem !important;
}
.min-h-screen {
  min-height: 100vh !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #4b5563 !important;
}
.w-full.max-w-2xl {
  width: 100% !important;
  max-width: 42rem !important;
  margin: 0 auto !important;
}
.bg-gray-300 {
  background-color: #d1d5db !important;
  border-radius: 1rem !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
  border: 1px solid #9ca3af !important;
  padding: 2rem !important;
}
::-webkit-scrollbar { width: 6px !important; }
::-webkit-scrollbar-track { background: #f1f1f1 !important; border-radius: 10px !important; }
::-webkit-scrollbar-thumb { background: #c1c1c1 !important; border-radius: 10px !important; }
::-webkit-scrollbar-thumb:hover { background: #a8a8a8 !important; }
[data-v-app] { display: block !important; width: 100% !important; }
.bg-gray-500 { background-color: #6b7280 !important; }
.bg-blue-500 { background-color: #3b82f6 !important; }
.bg-green-500 { background-color: #10b981 !important; }
.bg-red-500 { background-color: #ef4444 !important; }
.bg-yellow-500 { background-color: #f59e0b !important; }
.bg-purple-500 { background-color: #8b5cf6 !important; }
.hover\:bg-gray-600:hover { background-color: #4b5563 !important; }
.hover\:bg-blue-600:hover { background-color: #2563eb !important; }
.hover\:bg-green-600:hover { background-color: #059669 !important; }
.hover\:bg-red-600:hover { background-color: #dc2626 !important; }
.hover\:bg-yellow-600:hover { background-color: #d97706 !important; }
</style>