import { staticDb } from "~/client/pocketbase";

let post = () => {};

interface UPLOADPOST {
  title: string;
  body: string;
  thumb: File;
}
export let UploadPost = async (props: UPLOADPOST) => {
  let body_response = await staticDb.collection("post_body").create({
    body: props.body,
  });
  console.log("done");
  let post_resp = await staticDb.collection("posts").create({
    title: props.title,
    thumb: props.thumb,
    body: body_response.id,
  });

  return { post_resp, body_response };
};
