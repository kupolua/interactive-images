import { combineReducers } from 'redux';
import DefaultsReducer from './reducer_defaults'
import PreviewImage from './reducer_preview_image'
import ImageTape from './reducer_image_tape'
import StoreCouse from './reducer_store_course'

const rootReducer = combineReducers({
  defaults: DefaultsReducer,
  previewImage: PreviewImage,
  imageTape: ImageTape,
  removeTapeImage: ImageTape,
  setSelectedImage: ImageTape,
  setInitialImage: ImageTape,
  addPredicate: ImageTape,
  updatePredicate: ImageTape,
  addTargetImage: ImageTape,
  addTransitionQuestion: ImageTape,
  deleteCondition: ImageTape,
  storeCourse: StoreCouse,
});

export default rootReducer;
