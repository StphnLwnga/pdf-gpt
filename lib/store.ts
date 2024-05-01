import { create } from 'zustand'
import { Paper, Note } from './types'

type State = {
	currentPdfData: Partial<Paper & { pdfBuffer: Uint8Array }>,
	pdfBuffersArray: { pdfUrl: string, pdfBuffer: Uint8Array }[],
}

type Action = {
	setCurrentPdfData: (currentPdfData: State['currentPdfData']) => void,
	updateCurrentPdfData: (currentPdfData: State['currentPdfData']) => void,
	removeCurrentPdfData: () => void,
	setPdfBuffersArray: ({ pdfUrl, pdfBuffer }: { pdfUrl: string, pdfBuffer: Uint8Array }) => void,
}

export const usePdfStore = create<State & Action>((set) => ({
	currentPdfData: {},
	setCurrentPdfData: (currentPdfData) => set({ currentPdfData }),
	updateCurrentPdfData: (data) => set((state) => ({ currentPdfData: { ...state.currentPdfData, ...data } })),
	removeCurrentPdfData: () => set({ currentPdfData: {} }),
	pdfBuffersArray: [],
	setPdfBuffersArray: ({ pdfUrl, pdfBuffer }: { pdfUrl: string, pdfBuffer: Uint8Array }) => {
		set((state: State) => ({
			pdfBuffersArray: [
				...state.pdfBuffersArray,
				{ pdfUrl, pdfBuffer },
			],
		}))
	},
}));