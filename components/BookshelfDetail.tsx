import React from "react";
import { Book } from "../interfaces";
import DeleteBook from "./DeleteBook";

export type Props = {
  books: Book[];
  handleDeleteClick: (is: string) => void;
  isOwner: boolean;
};

const BookshelfDetail = (props: Props) => {
  return (
    <div className="flex flex-wrap mx-auto justify-start">
      {props.books.map((book, index) => {
        const url = `<a href="https://www.amazon.co.jp/gp/product/${book.id}/ref=as_li_ss_il?pf_rd_r=CFF50BEFPDYE94QQQSX5&pf_rd_p=3d55ec74-6376-483a-a5a7-4e247166f80b&linkCode=li3&tag=stepan-twitter-22&linkId=6990f183bf5b2ed36144f0cf8dc9c1ed&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${book.id}&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=stepan-twitter-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=stepan-twitter-22&language=ja_JP&l=li3&o=9&a=4344928148" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />`;
        return (
          <div className="flex justify-start m-3 relative" key={index}>
            <div dangerouslySetInnerHTML={{ __html: url }} />
            {props.isOwner && (
              <div
                onClick={() => props.handleDeleteClick(book.id)}
                className="absolute right-1 top-1 cursor-pointer"
              >
                <DeleteBook />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookshelfDetail;
