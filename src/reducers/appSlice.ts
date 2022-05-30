import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import axios from "axios";

const url = `http://localhost:3000/tour-operator/one-tour/NoEditarEsteTour`;
const url2 = `http://localhost:3000/tour-operator/update-tour/QCiQ9LuD6HRG6ALA5ZEV`;

export interface  basicInformation 
{
    tour: [any],
    /*tourName: string | null;
    id: number;
    duration: string | null;
    typeOfActivity: string[] | null;
    privateTour: boolean | null;
    document: string | null;
    description: string | null;
    groupTour: boolean | null;
    numberMaxTravelers: number | null;
    numberMinTravelers: number | null;
    photos: string | null;
    link: string | null;*/
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
} 
const initialState: basicInformation = {
    tour: [{}],
    /*tourName: null,
    id: 1,
    duration: null,
    typeOfActivity: null,
    privateTour: null,
    document: null,
    description: null,
    groupTour: null,
    numberMaxTravelers: null,
    numberMinTravelers: null,
    photos: null,
    link: null,*/
    status: 'idle'
};

export const fetchTours = createAsyncThunk('tour/fetchTours', async () => {
  const response = await axios.get(url)
  return response.data
})

export const updateTour = createAsyncThunk('tour/updateTour', async (initialPost:any) => {
  console.log(initialPost)
  const response = await axios.put(url2, initialPost)
  return response.data
})


export const appSlice = createSlice({
    name: 'Tour',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      addTour: {
        reducer(state, action) {
          state.tour?.push(action.payload)
        },
        prepare (tourName,duration,typeOfActivity):any
        {
          return {
            payload: {
              tourName,
              duration,
              typeOfActivity
            }
          }
        }
      }
    },

    extraReducers: (builder) => {
      builder
        .addCase(fetchTours.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTours.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.tour = action.payload
        })
        .addCase(fetchTours.rejected, (state) => {
          state.status = 'failed';
        })

        .addCase(updateTour.fulfilled, (state, action) => {
          action.payload.description =  action.payload.description;
          state.tour = action.payload
          
      });
    },
});

export const { addTour } = appSlice.actions;
export const selectAllTours = (state:any) => state.appSlice.tour;
export const getTourStatus = (state: any) => state.appSlice.status;


//export const tourName = (state: RootState) => state.tourN.tourName;

export default appSlice.reducer;