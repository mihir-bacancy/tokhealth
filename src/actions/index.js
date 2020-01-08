
export const set_selected_student = payload => {
    return {
        type: "SET_SELECTED_STUDENT",
        payload
    };
};



// Async Actions
export const setSelectedStudent = params => dispatch => () => {
    console.log("setSelectedStudent")
}
    // api.getAdjustmentCategory(params).then(response => {
    //     dispatch(
    //         set_selected_student(/*set data*/)
    //     );
    //     return response;
    // });
