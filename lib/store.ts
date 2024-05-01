import { create } from 'zustand'
import { Paper, Note } from './types'

type State = {
	activePdfId: string | null,
	pdfBuffersArray: Paper[],
}

type Action = {
	setActivePdfId: (pdfId: string | null) => void,
	setPdfBuffersArray: (paper: Paper) => void,
}

export const usePdfStore = create<State & Action>((set) => ({
	activePdfId: null,
	pdfBuffersArray: [],
	setActivePdfId: (pdfId: string | null) => set((state: State) => ({ activePdfId: pdfId, })),
	setPdfBuffersArray: (paper: Paper) => {
		set((state: State) => ({
			pdfBuffersArray: [
				...state.pdfBuffersArray,
				paper,
			],
		}))
	},
}));