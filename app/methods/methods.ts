import { staticDb } from "~/client/pocketbase";
import cookie from "cookie";
import { isTokenExpired } from "pocketbase";
import { redirect } from "react-router";
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

export let verifyCookie = async (cookie_string: string) => {
  let cookies = cookie.parse(cookie_string);
  if (!cookies) return;
  let pb_auth = cookies.pb_auth;
  if (!pb_auth) return;
  if (isTokenExpired(pb_auth)) return;
  throw redirect("/home")
};
