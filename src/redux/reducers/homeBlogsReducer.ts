import { GET_HOME_BLOGS, IGetHomeBlogsType, Blogs } from "../types/blogType";

const homeBlogsReducer = (state: Blogs[] = [], action: IGetHomeBlogsType): any => {
  switch (action.type) {
    case GET_HOME_BLOGS:
      return action.payload;

    default:
      return state;
  }
};

export default homeBlogsReducer;
