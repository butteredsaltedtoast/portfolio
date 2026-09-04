---
title: 'BlitzTactoe'
description: 'Real-time multiplayer tic-tac-toe with a five-second turn timer. Miss your window and you forfeit the move.'
pubDate: '2026-01-18'
github: 'https://github.com/butteredsaltedtoast/blitztactoe'
stack: ['Django', 'WebSockets', 'Redis', 'JavaScript']
category: 'systems'
---

BlitzTactoe is tic-tac-toe on a timer. Every move has a five-second countdown, and if you hesitate you lose the turn. Two players connect to a room, a three-second pre-game countdown starts once both sides ready up, and the board is live from there.

## What it does

- Public matchmaking and private rooms by ID
- Server-authoritative turn timer with per-turn countdown broadcast to both clients
- Rematch voting, ready states, and automatic starter rotation between games
- Full game state survives disconnects and reconnects, so you can walk away and come back to the same match

## Stack

- **Django 6** with **Django Channels** on ASGI, served by **Daphne** in production
- **Redis** as both the Channels layer backend and the durable store for live game state (so a worker restart doesn't nuke in-progress matches)
- **WebSockets** end to end, no polling or long-poll fallbacks
- Vanilla **JavaScript** and CSS on the client, static assets served via **Whitenoise**

## Architecture

Most of the logic is in `game/consumers.py`, an `AsyncWebsocketConsumer` that owns the game loop. In-memory dicts (`GAMES`, `GAME_CONNECTIONS`) give fast access during a match, while every state change gets mirrored to Redis under a `game:{room_id}` key. Per-room `asyncio.Lock`s serialize moves so two clicks arriving in the same millisecond can't both land. Input validation lives in `game/validators.py`. Room IDs, move indices, turn times, and game names all get checked before anything touches state.
