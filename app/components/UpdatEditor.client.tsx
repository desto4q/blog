import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";
import { staticDb } from "~/client/pocketbase";
import { UploadPost } from "~/methods/methods";
import type { SINGLEPOST } from "~/types/types";

export default function UpdateEditor(props: { post: SINGLEPOST }) {
  const editor = useRef<SunEditorCore>(null);
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };
  let buttonRef = useRef<HTMLButtonElement | null>(null);
  let contRef = useRef<HTMLDivElement>(null);
  let dialogRef = useRef<HTMLDialogElement | null>(null);
  let imageRef = useRef<HTMLImageElement | null>(null);
  let imageInputRef = useRef<HTMLInputElement | null>(null);
  let titleRef = useRef<HTMLInputElement | null>(null);
  let uploader = async () => {
    if (!editor.current || !titleRef.current || !buttonRef.current) return;
    buttonRef.current.disabled = true

    let form_data = new FormData();
    form_data.append("body", editor.current?.getContents(false));
    form_data.append("title", titleRef.current.value);
    form_data.append("post_id", props.post.id);
    form_data.append("post_body_id", props.post.body);
    let resp = await fetch("/api/update", {
      method: "post",
      credentials: "include",
      body: form_data,
    });
    if (resp.ok) {
      return toast.success("updated");
    }
    toast.error("failed to update");
    buttonRef.current.disabled = false;
  };
  let [height, setHeight] = useState("400");
  useLayoutEffect(() => {
    setHeight(String((contRef.current?.clientHeight ?? 400) - 160));
  }, []);

  return (
    <div
      className="flex  flex-col bg-base-300 h-[calc(100dvh-80px)]"
      ref={contRef}
    >
      <dialog className="modal" ref={dialogRef}>
        <div className="modal-box">
          <h2 className="text-xl label font-bold mb-3">Upload Info</h2>
          <h2 className="text-lg label capitalize mb-2 block">title</h2>
          <input
            type="text"
            placeholder="title"
            className="input w-full mb-2"
            ref={titleRef}
            defaultValue={props.post.title}
          />
          <button
            ref={buttonRef}
            className="btn w-full btn-primary"
            onClick={uploader}
          >
            Upload
          </button>
        </div>
      </dialog>
      <button
        className="btn   btn-primary"
        onClick={() => {
          dialogRef.current!.showModal();
          imageRef.current!.src = "";
          imageInputRef.current!.value = "";
        }}
      >
        Post
      </button>
      <SunEditor
        onSave={(e) => {
          console.log(e);
        }}
        setDefaultStyle="font-size: 18px"
        height={height}
        setAllPlugins={true}
        defaultValue={props.post.expand.body.body ?? "Hello World!"}
        getSunEditorInstance={getSunEditorInstance}
        onImageUploadBefore={(files, _info, uploadHandler) => {
          try {
            staticDb
              .collection("images")
              .create({
                img: files[0],
              })
              .then((_url) => {
                const response = {
                  result: [
                    {
                      url: staticDb.files.getURL(_url, _url.img),
                      name: files[0].name,
                      size: files[0].size,
                    },
                  ],
                };
                uploadHandler(response);
              })
              .catch((error) => {
                console.error("Error uploading image:", error);
                return false;
              });
          } catch (error) {
            console.error("Error in image upload:", error);
            return false;
          }
          return false;
        }}
        imageUploadHandler={(e) => {
          console.log(e);
        }}
        setOptions={{
          buttonList: buttonList.complex,
        }}
      />
    </div>
  );
}
