import NextHead from "next/head";
import { string } from "prop-types";
import React from "react";

const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "";

const Head = (props) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || "Percel.Com"}</title>
    <meta
      name="description"
      content={
        props.description ||
        ""
      }
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" href="" />
    <meta property="og:url" content={props.url || ""} />
    <meta
      property="og:title"
      content={props.title || "Parcel.Com"}
    />

    <meta
      property="og:description"
      content={
        props.description ||
        ""
      }
    />
    <meta
      property="og:image"
      content={props.ogImage || ""}
    />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="title" content="O" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="" />

    <meta name="twitter:site" content={props.url || ""} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:image"
      content={props.ogImage || ""}
    />
    <meta
      property="twitter:title"
      content="Parcel.Com"
    />
    <meta
      property="twitter:description"
      content="Parcel.Com"
    />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

export default Head;
