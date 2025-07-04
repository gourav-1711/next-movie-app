"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  addToWatchlist,
  createWatchlist,
} from "@/app/redux-store/features/watchList/watchlist";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function AddToCollectionModal({ movie,  openModal , setOpenModal }) {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.watchlist.lists);
  const [newCollectionName, setNewCollectionName] = useState("");

  const handleCreate = () => {
    if (newCollectionName.trim()) {
      dispatch(createWatchlist(newCollectionName.trim()));
      setNewCollectionName("");
    }
  };

  const handleAdd = (name) => {
    dispatch(addToWatchlist({ listName: name, movie }));
  };

  const hasCollections = Object.keys(collections).length > 0;

  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}  >
        <DialogContent className={"bg-transparent p-0 border-0 h-[50vh] rounded-3xl"}>
          <div className=" inset-0 bg-gray-800 bg-opacity-50 flex justify-center rounded-3xl items-center z-50">
            <div className="bg-white p-5 rounded-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold mb-4">Add to Collection</h2>

              {!hasCollections && (
                <p className="text-gray-600 mb-2">No collections found.</p>
              )}

              {/* Existing Collections */}
              {hasCollections && (
                <div className="space-y-2 mb-4">
                  {Object.keys(collections).map((name) => (
                    <button
                      key={name}
                      className="w-full text-left border px-3 py-2 rounded hover:bg-gray-100"
                      onClick={() => handleAdd(name)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}

              {/* Create New Collection */}
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="New collection name"
                  className="border rounded px-3 py-1 flex-1"
                />
                <button
                  onClick={handleCreate}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Create
                </button>
              </div>

              <button
                className="mt-4 text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
