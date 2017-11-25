import { combineReducers } from 'redux';
import DefaultsReducer from './reducer_defaults'
import PreviewImage from './reducer_preview_image'
import ImageTape from './reducer_image_tape'
import ApiGet from './reducer_apiGet'
import ApiPut from './reducer_apiPut'
import ApiPost from './reducer_apiPost'

const rootReducer = combineReducers({
  defaults: DefaultsReducer,
  previewImage: PreviewImage,
  imageTape: ImageTape,
  removeTapeImage: ImageTape,
  setSelectedImage: ImageTape,
  setInitialImage: ImageTape,
  updateImageName: ImageTape,
  addPredicate: ImageTape,
  updatePredicate: ImageTape,
  updatePredicateCode: ImageTape,
  updateCondition: ImageTape,
  addTargetImage: ImageTape,
  addTransition: ImageTape,
  addTransitionQuestion: ImageTape,
  deleteCondition: ImageTape,
  coursesList: ApiGet,
  storeCourse: ApiPut,
  course: ApiPost,
  setCourse: ImageTape,
  setTabValue: ImageTape,
  setProposedValue: ImageTape,
});

function isEven(value){
  if(value & 2) {
    return true
  } else {
    return false
  }
};

export default rootReducer;
