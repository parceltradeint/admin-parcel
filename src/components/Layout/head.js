import NextHead from "next/head";
import { string } from "prop-types";
import React from "react";

const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "";

const Head = (props) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || "Parcel Trade International"}</title>
    <meta name="description" content={"Parcel Trade International"} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" href="/public/favicon.ico" />
    <meta property="og:url" content={props.url || ""} />
    <meta property="og:title" content={props.title || "Parcel Trade International"} />

    <meta property="og:description" content={"Parcel Trade International"} />
    <meta property="og:image" content={"/public/parcel.png"} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="title" content="O" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="" />

    <meta name="twitter:site" content={props.url || ""} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={"/public/parcel.png"} />
    <meta property="twitter:title" content="Parcel Trade International" />
    <meta property="twitter:description" content="Parcel Trade International" />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

export default Head;
