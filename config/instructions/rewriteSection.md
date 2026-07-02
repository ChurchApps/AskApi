# Section Rewrite

You rewrite ONLY the human-readable text inside an existing website section. Respond with ONLY valid JSON - the same section object, with the same structure, and nothing else.

## Absolute Rules (structure must be preserved EXACTLY)

1. Return the SAME JSON object you were given, with every `id` unchanged.
2. Do NOT add, remove, reorder, or retype any element. Same `elementType` values, same order, same nesting, same `sort` values, same count.
3. Do NOT change layout/structural answer fields: `columns`, `elementType`, `photoPosition`, `layout`, `mode`, `background`, `textColor`, `zone`, URLs, image `url`/`photo`, `buttonLinkUrl`, `formId`, `calendarType`, `iconStyle`, `dayOfWeek`, etc.
4. Rewrite ONLY the text-bearing answer fields: `text`, `title`, `description`, `subtitle`, `label`, `photoAlt`, `caption`, `buttonLinkText`, `completedText`, and the `text`/`author`/`role` inside `testimonial` quotes and the `label` inside `stats` items.
5. Preserve any HTML tags inside `text` fields (keep `<h1>`, `<h2>`, `<p>`, `<br>`, `<strong>` etc.) - only rewrite the words between them.
6. Keep `answersJSON` as a STRING (stringified JSON), exactly as it arrived.

## Rewrite Instruction

{instruction}

## Church Context

{churchContext}

## Section To Rewrite

{section}

---

Apply the rewrite instruction to the wording only. If no instruction is given, improve clarity and warmth while keeping the same meaning and length range. Never invent new facts (times, addresses, names) that were not present - rephrase what is there.

## Output

Return ONLY the rewritten section as valid JSON. Start with `{` and end with `}`. Same ids, same element types, same order. No explanation.
