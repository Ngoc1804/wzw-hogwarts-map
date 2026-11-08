# Six flags redesign V3

GitHub research/download: https://github.com/game-icons/icons
- Lion and eagle-emblem and snake: Lorc, http://lorcblog.blogspot.com
- Badger: Caro Asercion, https://game-icons.net
- License CC BY 3.0: https://creativecommons.org/licenses/by/3.0/
Original vectors are kept in references/heraldry, with upstream license.txt. Modified by recoloring, scaling, integrating heraldic frames, cloth folds, stitched edges and fringe. This is adapted artwork, not official Harry Potter logo artwork. Beauxbatons and Durmstrang illustrations assembled locally using cubic curves and repeated feather shapes.

Canon research: https://www.harrypotter.com/features/the-macusa-seal-and-other-emblems-of-the-wizarding-world ; https://www.hp-lexicon.org/place/europe/france/beauxbatons-academy-of-magic/ . Ravenclaw is the book eagle and blue/bronze. Beauxbatons has crossed wands and 3 stars per wand. Durmstrang uses film-inspired double eagle; not an exact official-crest reproduction.

The four animal motifs retain their actual curved vector outlines from the attributed sources. Paper.js/SVG.js/SVGO pipeline from V2 is retained; this targeted patch preserves SVG data, replaces six crest objects, adds six complete flags, and enlarges the flags display. Six new flags rendered with librsvg; all 6 banner identity interactions passed jsdom. No real-browser visual QA.

245 total assets: 232 main and 13 internal. All non-heraldic assets remain the V2 designs. Open index.html for the complete library or flags.html for a six-flag review sheet.
