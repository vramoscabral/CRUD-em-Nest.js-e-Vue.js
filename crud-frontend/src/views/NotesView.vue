<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Notas</h1>


    <div v-if="message" :class="['p-3 mb-4 rounded', messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </div>


    <div class="flex gap-4 mb-6">
      <button
        v-for="opt in options"
        :key="opt"
        @click="current = opt"
        :class="[
          'px-4 py-2 border rounded transition-colors',
          current === opt ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
        ]"
      >
        {{ opt }}
      </button>
    </div>


    <div v-if="current === 'Adicionar'">
      <form @submit.prevent="addNote" class="mb-6 space-y-4">
        <div>
          <input
            v-model="form.title"
            placeholder="Título"
            class="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <input
            v-model="form.note"
            placeholder="Nota"
            class="border p-2 w-full rounded"
            required
          />
        </div>
        <button 
          type="submit" 
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          :disabled="loading"
        >
          {{ loading ? 'Adicionando...' : 'Adicionar' }}
        </button>
      </form>
    </div>

    <div v-else-if="current === 'Ver todos'">
      <div v-if="notes.length === 0" class="text-gray-500 text-center py-4">
        Nenhuma nota encontrada.
      </div>
      <ul v-else>
        <li
          v-for="n in notes"
          :key="n.id"
          class="flex justify-between items-center mb-2 border-b pb-2"
        >
          <div>
            <strong class="text-gray-800">{{ n.title }}</strong>: 
            <span class="text-gray-600">{{ n.note }}</span>
          </div>
        </li>
      </ul>
    </div>

    <div v-else-if="current === 'Editar'">
      <div v-if="notes.length === 0" class="text-gray-500 text-center py-4">
        Nenhuma nota para editar.
      </div>
      <ul v-else>
        <li
          v-for="n in notes"
          :key="n.id"
          class="flex justify-between items-center mb-2 border-b pb-2"
        >
          <div v-if="editId !== n.id" class="flex-1">
            <strong class="text-gray-800">{{ n.title }}</strong>: 
            <span class="text-gray-600">{{ n.note }}</span>
          </div>

          <div v-else class="flex-1 space-y-2">
            <input v-model="editForm.title" class="border p-1 w-full rounded" />
            <input v-model="editForm.note" class="border p-1 w-full rounded" />
          </div>

          <div class="flex gap-2 ml-4">
            <template v-if="editId !== n.id">
              <button
                @click="startEdit(n)"
                class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-colors"
              >
                Editar
              </button>
            </template>
            <template v-else>
              <button
                @click="saveEdit(n.id!)"
                class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
                :disabled="loading"
              >
                {{ loading ? 'Salvando...' : 'Salvar' }}
              </button>
              <button
                @click="cancelEdit"
                class="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </template>
          </div>
        </li>
      </ul>
    </div>

    <div v-else-if="current === 'Deletar'">
      <div v-if="notes.length === 0" class="text-gray-500 text-center py-4">
        Nenhuma nota para deletar.
      </div>
      <ul v-else>
        <li
          v-for="n in notes"
          :key="n.id"
          class="flex justify-between items-center mb-2 border-b pb-2"
        >
          <div>
            <strong class="text-gray-800">{{ n.title }}</strong>: 
            <span class="text-gray-600">{{ n.note }}</span>
          </div>
          <button
            @click="deleteNote(n.id!)"
            class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
            :disabled="loading"
          >
            {{ loading ? 'Excluindo...' : 'Excluir' }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Note } from "../services/noteService";
import { NoteService } from "../services/noteService";

const notes = ref<Note[]>([]);
const form = ref<Note>({ title: "", note: "" });
const loading = ref(false);
const message = ref("");
const messageType = ref<"success" | "error">("success");

const editId = ref<number | null>(null);
const editForm = ref<Note>({ title: "", note: "" });

const options = ["Adicionar", "Ver todos", "Editar", "Deletar"];
const current = ref("Ver todos");

function showMessage(text: string, type: "success" | "error" = "success") {
  message.value = text;
  messageType.value = type;
  setTimeout(() => {
    message.value = "";
  }, 3000);
}

async function loadNotes() {
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
}

async function addNote() {
  if (!form.value.title.trim() || !form.value.note.trim()) {
    showMessage("Preencha título e nota", "error");
    return;
  }

  try {
    loading.value = true;
    await NoteService.create(form.value);
    form.value = { title: "", note: "" };
    showMessage("Nota adicionada com sucesso!");
    await loadNotes();
    current.value = "Ver todos";
  } catch (error) {
    console.error("Erro ao adicionar nota:", error);
    showMessage("Erro ao adicionar nota", "error");
  } finally {
    loading.value = false;
  }
}

function startEdit(n: Note) {
  editId.value = n.id!;
  editForm.value = { ...n };
}

function cancelEdit() {
  editId.value = null;
  editForm.value = { title: "", note: "" };
}

async function saveEdit(id: number) {
  if (!editForm.value.title.trim() || !editForm.value.note.trim()) {
    showMessage("Preencha título e nota", "error");
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
}

async function deleteNote(id: number) {
  if (!confirm("Tem certeza que deseja excluir esta nota?")) {
    return;
  }

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
}

onMounted(loadNotes);
</script>