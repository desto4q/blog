import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";
import { staticDb } from "~/client/pocketbase";
import { UploadPost } from "~/methods/methods";

export default function Editor() {
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
    if (!buttonRef.current) return;
    buttonRef.current.disabled = true;
    if (titleRef.current!.value.length < 3) {
      buttonRef.current.disabled = false;
      return toast.error("title is empty");
    }
    let post_data = {
      title: titleRef.current?.value as string,
      body: editor.current?.getContents(false) as string,
      thumb: imageInputRef.current?.files?.[0] as File,
    };
    console.log(post_data.thumb);
    try {
      let resp = toast.promise(UploadPost(post_data), {
        loading: "Uploading...",
        success: `post has been added`,
        error: "Error",
      });
      buttonRef.current.disabled = false;
      console.log(resp);
      dialogRef.current?.close();
      return resp;
    } catch (err) {
      buttonRef.current.disabled = false;
      throw new Error(err as any);
    }
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
          <div className="h-[252px] mb-2">
            <img
              src={undefined}
              className="w-full h-full"
              alt=""
              ref={imageRef}
            />
          </div>
          <input
            type="text"
            placeholder="title"
            className="input w-full"
            ref={titleRef}
          />
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="file-input my-2 w-full"
            onChange={(e) => {
              let files = e.target.files;
              let file = files?.length && files[0];
              if (!file) return;
              let url = URL.createObjectURL(file as File);
              imageRef.current!.src = url;
            }}
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
        defaultValue="Hello World!"
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
