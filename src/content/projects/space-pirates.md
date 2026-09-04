---
title: 'Space Pirates'
description: 'Asteroid mining and trading game built in a single day at 8-Bit Jam, where it won Best Innovation.'
pubDate: '2026-08-22'
category: 'games'
github: 'https://github.com/RedNinja17/8bitgamejam2026'
stack: ['Godot', 'GDScript']
---

Space Pirates is a game four of us built at 8-Bit Jam on 22 August 2026, a single-day jam that ran from 8:15 AM to 6:00 PM. It won Best Innovation. Three of us wrote code and one did art.

You fly a ship around an asteroid field, collect ore, haul it back, and sell it. Then you spend the money on upgrades and fuel and go out again.

## The catch

Heavy ore is the good ore. Space Trash weighs 1 and sells for single digits. Lithium weighs 25 and goes for over a thousand.

Weight slows the ship, and fuel drains by how far you actually move. A full load means a slow trip home and a bigger refuel bill at the end of it.

Prices move while you fly, ticking every two seconds. Whatever you loaded up on can be worth less by the time you get back.

## Under the hood

The economy took the most work:

- **Market pricing.** A bounded random walk where the chance of a price rising is `1 - (price - min) / (max - min)`. At the floor it always rises, at the ceiling it always falls, so prices wander without ever running away.
- **Ore, cargo and fuel.** Five ore types with rarity, weight and price ranges. A cargo hold, and a fuel tank that drains by distance travelled and charges to refill.
- **Upgrades.** Four tiered tracks (engine speed, thrusters, laser damage, targeting array) with escalating costs, wired through a central `GameState` autoload.
- **Interface.** Shop, status and HUD screens, plus a custom software cursor so the pointer picks up the CRT shader like the rest of the screen.

The ship movement took a few passes to get feeling right: acceleration curves, braking distance, and turning to face the heading.

## What did not make it in

We prototyped a combat system, a peek-and-shoot standoff where you and an enemy each pick a direction and you win the round if you shoot where they peeked. The logic works but it never got wired into a scene before time ran out.
