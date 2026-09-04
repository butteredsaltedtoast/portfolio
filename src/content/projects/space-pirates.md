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

## What makes it a game and not a chore

The loop has real tension in it because everything pulls against everything else.

Ore is worth more when it is heavier. Space Trash weighs 1 and sells for single digits, Lithium weighs 25 and sells for over a thousand. Towed weight slows your ship down, and fuel burns based on how far you actually move. So the run that pays best is also the run that is slowest and most expensive to make.

Meanwhile the market does not sit still. Prices tick every two seconds and drift, so the ore you loaded up on may be worth less by the time you get home.

## Under the hood

The economy took the most work:

- **Market pricing.** A bounded random walk where the chance of a price rising is `1 - (price - min) / (max - min)`. At the floor it always rises, at the ceiling it always falls, so prices wander without ever running away.
- **Ore, cargo and fuel.** Five ore types with rarity, weight and price ranges. A cargo hold, and a fuel tank that drains by distance travelled and charges to refill.
- **Upgrades.** Four tiered tracks (engine speed, thrusters, laser damage, targeting array) with escalating costs, wired through a central `GameState` autoload.
- **Interface.** Shop, status and HUD screens, plus a custom software cursor so the pointer picks up the CRT shader like the rest of the screen.

The ship movement took a few passes to get feeling right: acceleration curves, braking distance, and turning to face the heading.

## What did not make it in

We prototyped a combat system, a peek-and-shoot standoff where you and an enemy each pick a direction and you win the round if you shoot where they peeked. The logic works but it never got wired into a scene before time ran out.
