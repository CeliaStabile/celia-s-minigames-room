import { useState, useEffect } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import type { Word } from "@types";



type WordListProps = {
    wordList: Word[],
    className? : string
}


export default function WordList({wordList, className}: WordListProps) {

    return (
        <div className={clsx("flex gap-5  flex-wrap justify-center", className)}>
                  {wordList.map((word, i) => (
                    <motion.p
                      key={i}
                      className={clsx(
                        word.found && "text-yellow-500 underline",
                        "pixel-clean"
                      )}
                      animate={word.found ? { scale: [1, 1.3, 1] } : undefined}
                    >
                      {word.word}
                    </motion.p>
                  ))}
                </div>
    )
 }
