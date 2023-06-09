#!/usr/bin/env bb

;; Script that fetches the latest hot take data from the devden bot and reformats it to remove the image references.
;; Usage to replace old data: ./update-hottakes.clj > hotTakeData.json
(def hottake-data-url
  "https://raw.githubusercontent.com/TheDeveloperDen/DevDenBot/master/hotTakeData.json")

(def pretty-printer
  (json/create-pretty-printer
   (assoc json/default-pretty-print-options :indent-arrays? true)))

(def exclusions
  #{"Aiden" "NotAiden" "Arthur" "Mark" "EssentialsX"
    "Bukkit" "SpigotMC" "PaperMC"
    "The world if {anything} was mainstream"
    "Average {thing} user vs average {thing} enjoyer"})


(-> hottake-data-url
    slurp
    (json/parse-string true)
    (->> (map (fn [[k v]]
                [k (remove exclusions (map #(or (:take %) %) v))]))
         (into {}))
    (json/generate-string {:pretty pretty-printer})
    println)
