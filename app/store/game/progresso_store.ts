// app/store/game/progresso_store.ts
import { create } from "zustand";

type ProgressoNivel = {
  nivelId: number;
  estrelas: number;
  pontosObtidos: number;
  concluida: boolean;
};

type ProgressoStore = {
  progressos: ProgressoNivel[];
  carregado: boolean;
  setProgressos: (p: ProgressoNivel[]) => void;
  getProgressoNivel: (nivelId: number) => ProgressoNivel | undefined;
  atualizarNivel: (p: ProgressoNivel) => void;
  invalidar: () => void;
};

export const useProgressoStore = create<ProgressoStore>((set, get) => ({
  progressos: [],
  carregado: false,

  setProgressos: (progressos) => set({ progressos, carregado: true }),

  getProgressoNivel: (nivelId) =>
    get().progressos.find((p) => p.nivelId === nivelId),

  // Chama isso ao salvar resultado — atualiza localmente sem rebuscar
  atualizarNivel: (novo) =>
    set((state) => ({
      progressos: state.progressos.some((p) => p.nivelId === novo.nivelId)
        ? state.progressos.map((p) => (p.nivelId === novo.nivelId ? novo : p))
        : [...state.progressos, novo],
    })),

  invalidar: () => set({ progressos: [], carregado: false }),
}));