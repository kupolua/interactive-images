import { combineReducers } from 'redux';
import DefaultsReducer from './reducer_defaults'
import PreviewImage from './reducer_preview_image'
import ImageTape from './reducer_image_tape'

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
});

export default rootReducer;
