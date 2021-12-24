export default function DeleteModal({
  deleteComment,
  setDeleteComment,
  deleteOneComment,
}) {
  return (
    <div className="deleteModal">
      <div className="deleteModalBox">
        <h2 className="deleteModalTitle">Delete comment</h2>
        <p className="deleteModalText">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="deleteModalButtonsContainer">
          <button
            className="deleteModalButton cancelDeleteButton mouse-pointer"
            onClick={() => setDeleteComment(false)}
          >
            NO, CANCEL
          </button>
          <button
            className="deleteModalButton confirmDeleteButton mouse-pointer"
            onClick={() => {
              deleteOneComment(deleteComment.id);
              setDeleteComment(false);
            }}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
