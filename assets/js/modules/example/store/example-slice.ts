import { injectSliceWithState } from '@Pimcore/app/store'
import { type PayloadAction, createSlice, type WithSlice } from '@reduxjs/toolkit'

export interface ExampleState {
  value: string
}

const initialState: ExampleState = {
  value: 'test2'
}

export const exampleSlice = createSlice({
  name: 'example',
  initialState,

  reducers: {
    selectSlice: (state) => {
      return state
    },

    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }

  },
  selectors: {
    selectValue: (state) => {
      return state.value
    }
  }
})

declare module '@Pimcore/app/store/index' {
  export interface LazyLoadedSlices extends WithSlice<typeof exampleSlice> {}
}

injectSliceWithState(exampleSlice)

export const { actions, selectors } = exampleSlice
export const { setValue } = actions
export const { selectValue } = selectors