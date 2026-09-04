---
title: 'Analytik'
description: 'Reads experiment data, flags problems in the setup, and proposes follow-up experiments.'
pubDate: '2026-03-07'
github: 'https://github.com/butteredsaltedtoast/analytik'
stack: ['Next.js', 'TypeScript', 'Tailwind', 'Groq', 'Llama']
category: 'ai'
---

Analytik is a data analysis tool for wet labs and computational teams. You upload experiment data as CSV or JSON, an LLM analyzes it end to end, and you can chat with the analysis to poke at findings, question assumptions, or ask what to try next.

## What it does

Every experiment gets broken into four sections:

- **Key Findings**: what the data actually shows
- **Invisible Architecture**: patterns and relationships the raw numbers hide
- **Hidden Problems**: confounders, biases, and gaps in the setup
- **Proposed Next Experiments**: concrete follow-ups ranked by expected information gain

Then a chat interface lets you ask about the analysis in plain language, things like "why did you flag that as a confounder?" or "what would falsify hypothesis 2?".

## Stack

- **Next.js 14** with the App Router and TypeScript
- **Tailwind** for styling, **Framer Motion** for the interaction polish
- **Groq SDK** hitting `llama-3.3-70b-versatile` for both the initial analysis and follow-up chat
- **localStorage** for persistence. No database, no auth. Users bring their own API key from `console.groq.com` and everything stays client-side

## Architecture

Two API routes do the work: `POST /api/analyze` runs the four-section breakdown on upload, and `POST /api/chat` handles conversation with the experiment as context. The React side is thin: a file upload component that analyzes and redirects, an analysis renderer, and a chat window that streams responses back into the same experiment record.
