<!--
FILE: 02-article.md
PURPOSE: Published article content
VERIFICATION DATE: 2026-09-21
-->

SEO Title: How Does Smart AI Ride-Pooling Work? From Matching to Reducing Congestion

Meta Description: A guide explaining smart ride-pooling systems: the difference between Ride-Hailing and Ride-Pooling, real-time matching, demand prediction, GNNs and reinforcement learning, fleet rebalancing, and how to measure their real impact on congestion and emissions.

Suggested Slug: smart-ai-ride-pooling

# How Does Smart AI Ride-Pooling Work? From Matching to Reducing Congestion

**Smart Ride-Pooling (Dynamic Ride-Pooling) is an on-demand transportation system that tries to combine passengers with compatible routes inside the same vehicle in real time, while balancing several conflicting goals: reducing passenger waiting time, reducing deviation from their route, raising vehicle occupancy, cutting empty-distance travel, and improving fleet efficiency.**

The idea sounds simple:

```text
Passenger A: from X to Y
Passenger B: from a nearby point to a nearby destination
                 ↓
          one shared vehicle
```

But implementing it across an entire city is not just "finding the nearest car."

The real system needs to solve a problem that changes every second:

- New requests arrive continuously.
- Vehicles are moving.
- Some passengers are already inside vehicles.
- Travel times change with traffic.
- Every passenger has an acceptable limit for waiting and detour.
- Capacity is limited.
- Some requests cannot be combined without hurting service quality.
- Today's decision affects where the vehicle will be in minutes — and whether it can serve the next request.

This is why a modern ride-pooling system is closer to a real-time optimization platform:

```text
Requests + Vehicles + Traffic + Constraints
                    ↓
          Matching & Routing Engine
                    ↓
      Shared Trips + Fleet Rebalancing
                    ↓
          Continuous Re-optimization
```

# What Is the Difference Between Ride-Hailing and Ride-Pooling?

The two terms are sometimes used as if they were the same thing, but the difference matters.

## Ride-Hailing

A digital platform connects:

- A single passenger or group.
- With a driver/vehicle.

Such as a private trip through an app.

```text
Passenger A → Vehicle 1
Passenger B → Vehicle 2
Passenger C → Vehicle 3
```

## Ride-Pooling

The platform tries to combine independent requests inside the same vehicle if they are compatible.

```text
Passenger A ┐
Passenger B ├→ Vehicle 1
Passenger C ┘
```

FHWA describes ride-sharing in the on-demand transportation environment as a situation where passengers choose a product that allows their trips to be matched with other passengers who have overlapping routes.

![A MOIA ride-pooling service electric minibus stopped at an operations hub in Hamburg](/images/articles/body/smart-ai-ride-pooling-2.avif "MOIA's electric vehicle in Hamburg, designed for Ride-Pooling service that combines passengers with similar routes in one vehicle instead of a private trip per request — Source: Rebecca Hadler, Wikimedia Commons, CC BY-SA 4.0")

So:

> **Every Ride-Pooling is on-demand transportation, but not every Ride-Hailing involves actually sharing the ride.**

And this difference is fundamental when discussing congestion and emissions.

# Do Ride-Hailing Apps Automatically Reduce Congestion?

No.

The idea may seem logical:

> If people use a car they don't own, the number of cars will decrease.

But the system may add new kilometers because of:

- Driving the car without passengers between requests.
- Heading to the pickup point.
- Attracting people who would have used the bus, metro, or walking.
- New trips that would never have happened otherwise.

The distances a vehicle travels without a passenger are called:

**Deadheading**

In a study of roughly 1.5 million RideAustin trips, the drivers' driving to and from the work area was estimated at 19% of the service's total VMT, while driving between trips accounted for another 26% in the study's estimate.

These are figures for **a specific case study**, not a fixed global percentage.

A study published in Science Advances also found that the spread of ride-hailing companies in San Francisco contributed to increased congestion during the 2010–2016 period it studied.

So:

> **App-based transportation is not synonymous with sustainable shared transportation.**

The real question is:

> Does the system increase average occupancy and reduce Vehicle Kilometers Traveled after accounting for empty distances, detours, and mode shift from the original means of transport?

# When Can Ride-Pooling Reduce the Number of Vehicles?

The benefit is realized when the system can combine requests that would otherwise have needed separate vehicles.

Example:

Without pooling:

```text
A → car 1 → 8 km
B → car 2 → 7 km
C → car 3 → 9 km
```

The total may be:

```text
24 vehicle-km
```

With good pooling:

```text
A+B+C → one vehicle → 13 km
```

VKT may drop.

But if the pickup points are far apart:

```text
detour = 8 km
```

the benefit may vanish.

So success depends on:

- Demand density.
- Similarity of Origins/Destinations.
- The waiting window.
- The acceptable detour limit.
- Fleet size.
- Vehicle capacity.
- Request timing.
- Matching quality.

# Why Is Dynamic Ride-Pooling a Hard Problem?

Suppose there are:

- 5,000 vehicles.
- 20,000 active requests.
- Multiple passengers inside some vehicles.

Every possible Combination cannot be tested in a naive way.

Each new request may fall:

- Before another passenger's Pickup.
- After it.
- Between Drop-offs.
- Or be rejected.

And Constraints must be respected, such as:

```text
vehicle_capacity
maximum_wait_time
maximum_detour
pickup_time_window
dropoff_time_window
driver_constraints
service_area
```

The problem is therefore related to families of:

- Dynamic Vehicle Routing.
- Dial-a-Ride Problem.
- Assignment.
- Combinatorial Optimization.

These are problems that can become computationally very hard as scale grows.

![An example of a vehicle routing problem on a road network: three vehicles departing from a central depot D and serving distributed points along colored routes](/images/articles/body/smart-ai-ride-pooling-1.avif "A simplified example of a Vehicle Routing problem: three vehicles share the service of 11 points starting from a central depot — Source: Zootos, Wikimedia Commons, CC BY-SA 4.0")

# What Is the Full Path of a Passenger Request?

The system can be envisioned as follows:

```text
1. Passenger Request
       ↓
2. Validate request
       ↓
3. Find candidate vehicles
       ↓
4. Generate feasible shared trips
       ↓
5. Estimate pickup + detour
       ↓
6. Score alternatives
       ↓
7. Assign vehicle
       ↓
8. Update route
       ↓
9. Track execution
       ↓
10. Re-optimize when state changes
```

Each stage has a different goal.

# 1. Receiving the Request

A typical request may contain:

```text
pickup_location
dropoff_location
request_time
max_wait
max_detour
passenger_count
accessibility needs
```

And the system should not collect additional data it does not need.

# 2. Searching for Candidate Vehicles

Instead of comparing the request with every vehicle in the city, the search can be narrowed by:

- ETA to the pickup point.
- The geographic zone.
- Free capacity.
- The direction of the current trip.
- Whether the request can be inserted into the existing Route.

This step shrinks the search space.

# 3. Can a New Passenger Be Inserted into an Existing Trip?

Suppose the current Route is:

```text
Pickup A
Dropoff A
```

Request B arrives.

The system may try:

```text
Pickup A
Pickup B
Dropoff A
Dropoff B
```

or:

```text
Pickup A
Pickup B
Dropoff B
Dropoff A
```

then computes:

- How much will B's waiting increase?
- How much will A's time increase?
- Is capacity exceeded?
- Are the Time Windows still valid?

If any Constraint fails, the request cannot be inserted into this vehicle.

![A diagram showing a vehicle's current route picking up and dropping off passenger A, then two possible orderings for inserting passenger B — one accepted and one rejected because A's delay exceeds the allowed limit — along with the list of checked constraints](/images/articles/body/smart-ai-ride-pooling-3.avif "Insertion testing: the system tries the possible Pickup and Dropoff orderings for the new request, accepting an ordering only if waiting, detour, capacity, and time windows stay within limits — illustration: Techno Enjaz")

# The Request-Trip-Vehicle Graph

Among the most influential research frameworks in Dynamic Ride-Sharing is the work of Alonso-Mora and colleagues published in 2017.

The simplified idea:

1. Determine which Requests can be shared.
2. Build possible Trips that satisfy the constraints.
3. Determine which Vehicle can serve each Trip.
4. Solve the Assignment between Trips and vehicles.

This can be represented conceptually:

```text
Requests
   ↓
Feasible shared trips
   ↓
Trip ↔ Vehicle compatibility
   ↓
Global assignment
```

In the study's experiment on data from roughly 3 million taxi trips in New York, the researchers showed that the dynamic matching algorithm could achieve high service rates using a smaller fleet in the simulation model, with a clear Trade-off between:

- Fleet size.
- Vehicle capacity.
- Waiting time.
- Passenger delay.

But these are **simulation results on a specific Dataset and scenario**, not a promise that any city will see the same ratios.

# Why Not Use Greedy Matching Only?

Greedy says:

> Give the request to the nearest available vehicle now.

The advantages:

- Fast.
- Simple.
- Easy to operate.

But it may produce a bad decision five minutes later.

Example:

Vehicle A is the closest to a small request, but a minute later two highly compatible requests appear in A's same area.

If we used A now, we might lose better future Pooling.

This is the distinction between:

- **A Myopic decision**
- **An Anticipatory decision**

# The Algorithms Used in Ride-Pooling

There is no single Algorithm suited to every platform.

## Greedy / Insertion Heuristics

They test inserting a new request into a current Route.

Suitable when we want:

- Speed.
- A strong Baseline.
- A simpler system.

## Integer / Mixed Integer Optimization

Assignment can be formulated as an Optimization problem.

Useful when we need:

- A better global solution.
- Clear Constraints.

But computation time can become a challenge at large Scale.

## Metaheuristics

Such as:

- Large Neighborhood Search.
- Genetic Algorithms.
- Simulated Annealing.

They may help find good solutions in large search spaces.

But there is no guarantee they are faster or better in every scenario.

## Machine Learning

ML can be used in parts of the system instead of replacing the entire Optimization.

Such as:

- ETA prediction.
- Demand forecasting.
- Acceptance probability.
- Travel time.
- Candidate pruning.

## Reinforcement Learning

RL can be used for longer-term decisions such as:

- Rebalancing.
- Pricing.
- Zone selection.
- Anticipatory control.

But RL is not a magic solution to the matching problem.

In many of the strongest research systems, the design is **Hybrid**:

```text
Machine Learning predicts
Optimization decides
Simulation evaluates
```

or:

```text
GNN/RL chooses strategic action
        ↓
Assignment solver handles hard constraints
```

# Why Use Graph Neural Networks?

The road network is a Graph by nature.

```text
Node = zone / intersection
Edge = road / adjacency
```

And demand in one zone affects nearby zones.

A GNN can build a Representation of the state:

```text
zone demand
available vehicles
travel time
neighbor congestion
```

then produce Embeddings that represent the spatial relationships.

For example:

```text
Urban Graph
   ↓
GNN
   ↓
Spatial Representation
   ↓
RL / Prediction / Optimization
```

But using a GNN does not automatically mean the model beats traditional methods.

It must be compared against Baselines under:

- The same data.
- The same Constraints.
- The same Compute budget.
- The same KPIs.

# What Is the Role of Deep Reinforcement Learning?

In Ride-Pooling, the current decision affects the future.

If we send a vehicle to the west of the city now:

```text
current reward
```

may be lower, but ten minutes later a high demand density may appear there.

RL tries to learn a Policy that maximizes Reward over a time Horizon instead of a single decision.

The State may contain, for example:

```text
vehicle distribution
active requests
forecast demand
traffic state
seat occupancy
```

And the Action:

```text
reposition vehicle
change zone
prioritize request group
adjust policy parameter
```

And the Reward:

```text
+ served trips
+ occupancy
- waiting time
- detour
- deadheading
- rejection
- emissions proxy
```

But Reward design is very sensitive.

If we give a large weight to revenue only, the system may ignore fairness.

If we give a large weight to Occupancy, it may cause annoying Detours.

# Is MADRL-GNN the Ideal Architecture?

The original research line proposes combining:

**Multi-Agent Deep Reinforcement Learning + Graph Neural Networks**

It is a logically sound research idea because:

- Vehicles are numerous.
- The network is a Graph.
- Decisions are sequential.
- Demand is Spatio-temporal.

But this should not be turned into:

> MADRL-GNN is the best proven algorithm for ride-pooling.

A fair comparison requires:

- A complete Implementation.
- Baselines.
- Hyperparameter tuning.
- Multiple Seeds.
- Real Datasets.
- Ablation studies.
- Statistical significance.
- Compute cost.
- Out-of-distribution tests.

Also, the claim that inference after training becomes **O(1)** is not generally true.

The cost of a GNN, for instance, depends on:

- The number of Nodes.
- The number of Edges.
- The number of Layers.
- The size of Features.

And the cost of the Assignment solver depends on the number of:

- Vehicles.
- Requests.
- Possible trips.
- Constraints.

# What Is Fleet Rebalancing?

Even if matching is excellent, the fleet may cluster in the wrong place.

For example:

```text
08:00
Residential zones → many requests
Downtown → few cars available later
```

After dropping passengers downtown:

```text
10:00
Downtown → many idle cars
Residential → new demand
```

Rebalancing means proactively directing empty vehicles.

But here is the paradox:

> Repositioning helps reduce waiting, but it adds Deadheading.

So the goal must be:

```text
benefit of future positioning
>
cost of empty travel
```

![A two-panel diagram: at 8 a.m. vehicles carry passengers from residential neighborhoods to downtown, and at 10 a.m. empty vehicles pile up downtown so some are redirected back to the neighborhoods where new demand appears](/images/articles/body/smart-ai-ride-pooling-4.avif "Fleet rebalancing: proactively moving empty vehicles reduces later waiting, but adds Deadheading, so the benefit of positioning must outweigh the cost of traveling without passengers — illustration: Techno Enjaz")

# How Do We Predict Demand?

Demand Forecasting tries to estimate:

```text
requests(zone, time)
```

based on:

- Historical demand.
- Time of day.
- Day of week.
- Weather.
- Events.
- Holidays.
- Transit disruptions.
- The current demand trend.

You can use:

- Time-series models.
- Gradient boosting.
- LSTM/GRU.
- Temporal CNN.
- GNN.
- Transformers.

But there is no single "gold standard."

The best model depends on:

- The Dataset.
- Spatial granularity.
- The forecast horizon.
- City dynamics.

# Is a 15–45 Minute Forecast Always Appropriate?

No.

This Horizon should be chosen according to the operational decision.

## 5 Minutes

Useful for:

- Near-term rebalancing.

## 30 Minutes

Useful for:

- Fleet positioning.

## Hours

Useful for:

- Staffing.
- Charging.
- Supply planning.

What matters most is not Forecast accuracy alone.

A less accurate Model may lead to better Fleet decisions.

So you must measure:

> **The operational value of the forecast**

and not RMSE only.

# The Architecture of a Real Ride-Pooling Platform

It can be designed in layers:

```text
Passenger / Driver Apps
          ↓
      API Layer
          ↓
Event / Request Stream
          ↓
┌─────────────────────────┐
│ Real-time State Store   │
│ Vehicle positions       │
│ Active requests         │
│ Current routes          │
└─────────────────────────┘
          ↓
┌─────────────────────────┐
│ Intelligence Layer      │
│ ETA prediction          │
│ Demand forecast         │
│ Matching                │
│ Routing                 │
│ Rebalancing             │
└─────────────────────────┘
          ↓
    Dispatch Decisions
          ↓
 Driver / Passenger Apps
```

Alongside it:

```text
Historical Data
     ↓
Training / Analytics
     ↓
Model Registry
```

![A diagram of a ride-pooling platform architecture: passenger and driver apps, then an API layer, an event stream, a real-time state store, and the intelligence layer that issues dispatch decisions, with a non-real-time path from historical data to training and the model registry](/images/articles/body/smart-ai-ride-pooling-5.avif "Ride-Pooling platform architecture: a real-time path from the apps to the state store, the intelligence layer, and dispatch decisions, and a non-real-time path that trains prediction and matching models from historical data — illustration: Techno Enjaz")

# Do We Actually Need Big Data?

Not every system needs "Big Data."

A small platform in a limited city may operate efficiently with:

- A geographic database.
- Simple stream processing.
- An optimization service.

The term Big Data becomes meaningful when we have Scale, Velocity, or Variety that genuinely requires a distributed Architecture.

The goal is not:

> "Using Kafka and a Data Lake because the system is smart."

but rather:

> Building the simplest Architecture that can meet the required SLA.

# What Data Does the System Need?

## From the Passenger

- Origin.
- Destination.
- Request time.
- Party size.
- Maximum waiting preference.
- Accessibility needs, when necessary.

## From the Vehicle

- Current location.
- Route.
- Occupied seats.
- Capacity.
- Status.
- Energy/fuel state, when it matters.

## From the Network

- Travel times.
- Closures.
- Incidents.
- Congestion.

## Historically

- Demand by zone/time.
- Cancellations.
- Wait times.
- Pickup success.
- Detours.
- Deadheading.

# Map Matching

GPS does not always give an exact location on the road.

The point may appear:

```text
10 meters beside the road
```

Map Matching links the Telemetry to the nearest logical Segment in the road network.

This is an important step because Route optimization depends on a correct Graph.

# Is Edge Computing Necessary?

Not always.

Much Ride-Pooling can run via a Cloud / Data Center because the Dispatch decision is centralized by nature.

Edge may be useful for:

- Local traffic processing.
- Privacy filtering.
- Connected vehicle systems.
- Low-latency roadside analytics.

But putting "AI inside every vehicle" is not a requirement for dynamic pooling.

# How Do We Define the Objective Function?

A poorly optimized system may achieve one Metric and harm the rest.

Example:

## Minimizing VMT Only

May make passengers wait a long time.

## Minimizing Waiting Only

May send many separate vehicles.

## Maximizing Occupancy Only

May impose large Detours.

So we need Multi-objective Optimization.

A simplified example:

```text
Cost =
  a × waiting_time
+ b × passenger_detour
+ c × empty_distance
+ d × rejected_requests
+ e × operating_cost
+ f × emissions
```

The weights are not "fixed scientific values."

They express Policy and Business goals, and their sensitivity must be tested.

# What Are the Right Performance Indicators?

## Passenger Experience Indicators

- Mean wait time.
- P90/P95 wait time.
- In-vehicle time.
- Detour time.
- Cancellation rate.
- Rejection rate.
- Pickup reliability.

## Fleet Indicators

- Vehicle occupancy.
- Pooling rate.
- Deadheading distance.
- Revenue kilometers.
- Idle time.
- Trips per vehicle-hour.

## Network Indicators

- Total VKT.
- VHT.
- Average speed.
- Congestion delay.

## Sustainability Indicators

- Fuel/energy use.
- CO₂e.
- Emissions per passenger-km.

## Equity

- Wait time by zone.
- Rejection by zone.
- Service coverage.
- Accessibility.

This prevents the system from optimizing downtown only and leaving the outskirts with poor service.

# Why Is P95 Sometimes More Important Than the Mean?

If average waiting is:

```text
4 min
```

it may look excellent.

But if:

```text
10% of users wait 18+ min
```

there is a problem.

So monitor the Distribution, not just the Mean.

# How Do We Measure Congestion?

This is not enough:

> The number of vehicles we theoretically saved.

Use:

- Vehicle Kilometers Traveled — VKT.
- Vehicle Hours Traveled — VHT.
- Vehicle Hours of Delay — VHD.
- Speed.
- Queue length.
- Network throughput.

And you must account for:

```text
occupied travel
+
pickup deadheading
+
between-trip deadheading
+
rebalancing
+
detours
```

# Does Ride-Pooling Always Reduce Emissions?

No.

The environmental benefit depends on:

```text
avoided vehicle travel
-
new deadheading
-
pooling detours
-
mode substitution
```

If a person switches from a private car to a shared Ride-Pool, a benefit may appear.

But if they switch from:

- Metro.
- Bus.
- Walking.
- Cycling.

to a Ride-Pool vehicle, energy or emissions may increase.

This is why the literature gives different results across cities.

Systematic reviews indicate that Pooling has great **potential** to reduce VMT and energy, but actual results depend on:

- The real participation rate.
- Occupancy.
- Deadheading.
- Modal substitution.
- City form.
- The transit network.

# The Key Environmental Metric: Emissions per Passenger-Kilometer

A comparison of:

```text
CO₂ per vehicle
```

can be misleading.

Better in many cases:

```text
CO₂e / passenger-km
```

because a vehicle carrying three passengers may consume slightly more than one carrying a single passenger, but it distributes the consumption over more passengers.

With electric cars, the Scope must also be defined:

- Tailpipe emissions.
- Electricity generation.
- Lifecycle emissions.

# What About EV Ride-Pooling?

Electrifying the fleet can reduce operational emissions depending on the electricity mix.

But it adds new Constraints:

```text
state of charge
charger location
charging time
charger queue
battery reserve
```

turning the Optimization into:

```text
passenger assignment
+
routing
+
rebalancing
+
charging
```

And sending a distant EV to a request may not be good if it leads to Charging downtime later.

# Simulation: How Do We Prove the System Is Useful?

If real operating data is unavailable, Simulation is an essential tool.

But we must be clear:

> **Simulation is empirical evidence inside a model, not automatic proof of performance in a real city.**

# Using SUMO

SUMO supports Demand Responsive Transport simulation via the Taxi Device.

The current documentation includes Dispatch algorithms such as:

- Greedy.
- greedyClosest.
- greedyShared.
- routeExtension.
- Custom dispatch via TraCI.

This makes it suitable for building a Baseline and testing an external algorithm.

# Designing a Good Experiment

## Baseline A: Private Trips

Each request → a separate vehicle.

## Baseline B: Ride-Hailing

One vehicle per Request with Deadheading.

## Baseline C: Greedy Pooling

Simple Pooling.

## Model D: Advanced Optimization

The comparison algorithm.

Then fix:

- The same Demand.
- The same Network.
- The same travel-time assumptions.
- The same vehicle capacity.
- The same maximum wait/detour.

and compare.

# Do Not Compare AI Against a Deliberately Weak Algorithm

A common research error:

```text
AI Model
vs
naive nearest-car baseline
```

and then claiming:

> AI is far better.

Strong Baselines must be added, such as:

- An insertion heuristic.
- Optimization-based assignment.
- Predictive rebalancing.
- An established ride-pooling algorithm.

Otherwise we do not know whether the gain comes from "AI" or from a weak comparison.

# Ablation Study

If the system is:

```text
Demand Forecast
+ GNN
+ RL
+ Rebalancing
```

test:

```text
without forecast
without GNN
without RL
without rebalancing
```

so we know what added the value.

# Testing Across Multiple Seeds

The traffic environment is stochastic.

Running the Simulation once is not enough.

Use:

- Multiple Random seeds.
- Confidence intervals.
- Statistical tests when needed.

And do not claim:

> "We reduced congestion by 27%"

if the number comes from a single Run.

# Stress Scenarios

Test:

## Demand +20%

Does the system collapse?

## A Traffic Incident

Does it reroute?

## Rain/event surge

Does the Forecast adapt?

## GPS noise

Is Map matching stable?

## Driver shortage

Does Rejection rise in a fair way?

## Communication delay

Are the decisions still valid?

# What Is the Rejection Rate Problem?

A system can improve average waiting by rejecting difficult requests.

For example:

```text
serve easy downtown requests
reject remote requests
```

and then the Metrics look good.

So you must monitor:

- Served demand.
- Rejection.
- Geography.
- Rider class.

together.

# Fairness in Ride-Pooling

The Optimization may learn that some zones are "less profitable."

If we do not impose Constraints, this may happen:

```text
central zone → great service
outer zone   → high rejection
```

You can add:

- Minimum service coverage.
- Maximum geographic disparity.
- Fairness penalties.
- Zone-level KPIs.

But fairness is not just one Weight; it needs a clear definition of what equity means in the city's context.

# Privacy: Mobility Data Is Sensitive

Ride-Pooling usually knows:

- Where a trip starts.
- Where it ends.
- When the person moves.
- The frequency of visits.
- Life patterns.

Even if we delete the name, Mobility traces can be re-identifiable in some circumstances.

So use:

## Data Minimization

Do not collect what you do not need.

## Retention Limits

Do not keep high-precision location forever.

## Access Control

Separate:

- Live operations.
- Analytics.
- Research datasets.

## Aggregation

Zone-level Forecasting may not need the raw Trajectory of every user.

## Pseudonymization

Useful, but not a complete guarantee of anonymity.

# Security

The system may control thousands of vehicles.

You must protect:

- The API.
- The driver app.
- The passenger app.
- The dispatch engine.
- Admin access.
- GPS telemetry.
- Model endpoints.

Among the risks:

- Fake ride requests.
- GPS spoofing.
- Account takeover.
- Route manipulation.
- Denial-of-service.
- Data leakage.

# Can AI Itself Cause a Traffic Problem?

Yes.

Imagine a Model predicts that Zone A will become hot.

So it repositions 500 vehicles there.

All the vehicles behave the same way.

The result:

> Rebalancing congestion.

This is why control must be:

- Capacity-aware.
- Network-aware.
- Coordinated.

An excellent Forecast is not enough.

# The Relationship with Public Transit

The best Ride-Pooling does not necessarily have to try to replace:

- Metro.
- Bus.
- Tram.

The greatest value may lie in:

- First-mile.
- Last-mile.
- Low-demand hours.
- Underserved zones.

That is:

```text
Ride-Pool
   ↓
Transit Hub
   ↓
Metro / BRT / Rail
```

instead of:

```text
Ride-Pool
   ↓
40 km across city
```

Integrating with public transit may be more sustainable than competing with it.

# Dynamic Pricing: Is It Part of the Intelligence?

Price can be used to change:

- Demand.
- The acceptance of pooling.
- The balance of supply.

Such as:

```text
private ride = higher price
pooled ride  = discount
```

But dynamic pricing may raise:

- Fairness.
- Affordability.
- Price discrimination concerns.

And the system's goal must not be:

> Filling cars at any cost.

but improving transportation service while protecting users.

# What About Autonomous Vehicles?

They can change the Economics because the driver cost may disappear.

But this may also lead to:

- More empty trips.
- Greater repositioning.
- Induced demand.

So Autonomous Ride-Pooling is not automatically less congesting.

The algorithm must reduce:

```text
empty movement
```

and not just the operating cost.

# What About eVTOL and Urban Air Mobility?

The ideas of:

- Assignment.
- Scheduling.
- Fleet management.

can theoretically be extended to eVTOL.

But this is an entirely different research and regulatory area, involving:

- Airspace.
- Vertiports.
- Battery safety.
- Weather.
- Aviation certification.

So it should not be presented as a simple extension of the same Ride-Pooling application.

# A Practical Framework for Building the System

## Phase 1: Do Not Start with AI

Build a Baseline:

```text
nearest feasible vehicle
+
simple insertion
```

and know its performance.

## Phase 2: Add Constraints

- Wait.
- Detour.
- Capacity.
- Service area.

## Phase 3: Add Optimization

A better solution for matching.

## Phase 4: Add Demand Forecast

Only if it proves that Rebalancing needs it.

## Phase 5: Add Learning

Such as GNN/RL if the Baselines no longer achieve the goal.

## Phase 6: Test Operational KPIs

and not Model loss only.

## Phase 7: Test Externalities

- VKT.
- Congestion.
- Emissions.
- Equity.
- Transit substitution.

# A Practical Architecture Example

```text
Passenger App
     ↓
Ride Request API
     ↓
Request Stream
     ↓
Candidate Search
     ↓
Travel Time Engine
     ↓
Feasible Trip Generator
     ↓
Assignment Optimizer
     ↓
Route Update
     ↓
Driver App

             Historical Data
                    ↓
            Demand Forecast
                    ↓
            Rebalancing Policy
                    ↓
              Fleet State
```

And GNN/RL can be added inside:

```text
Demand representation
or
Rebalancing policy
or
Strategic matching
```

instead of placing "AI" in every Component without need.

# How Do We Decide Whether the System Succeeded?

Do not say:

> "The model achieved 95% Accuracy."

Ride-Pooling is not Classification.

Say, for example:

```text
Served requests:        +x%
Median wait:            -y%
P95 wait:               -z%
Mean occupancy:         +a
Deadhead VKT:           -b%
Total VKT:              -c%
Passenger detour:       +d min
CO₂e/passenger-km:      -e%
```

then add:

- A confidence interval.
- The baseline.
- The scenario.
- The dataset.
- The simulation assumptions.

# The Most Important Corrections to Watch Out For

## "The Problem Is NP-hard, So Traditional Methods Don't Work"

Incorrect.

Worst-case difficulty does not mean every practical Instance is unsolvable.

Heuristics and modern Optimization can be very powerful.

## "DRL Runs in O(1) After Training"

Incorrect as a rule.

Inference depends on the input size and the architecture, and costly Assignment/route optimization may remain.

## "AI Eliminates Congestion"

Exaggeration.

The outcome depends on user behavior, policies, and demand.

## "Pooling Always Lowers CO₂"

Incorrect.

It may fail if these rise:

- Deadheading.
- Detours.
- Substitution from transit.

## "Reducing the Number of Vehicles = Reducing Emissions by the Same Percentage"

Incorrect.

You must measure:

- Distance.
- Speed.
- Fuel/energy.
- Occupancy.

## "A Simulation Result = A Real City Result"

Incorrect.

Simulation needs Calibration and Validation.

# Conclusion

A smart ride-pooling system is not just an app that connects several passengers to a car.

It is a real-time control and decision-making system:

```text
Observe
   ↓
Forecast
   ↓
Generate feasible shared trips
   ↓
Optimize assignment
   ↓
Route
   ↓
Rebalance
   ↓
Measure
   ↓
Repeat
```

Artificial intelligence can help with:

- Predicting demand.
- Estimating travel times.
- Representing the network with a GNN.
- Learning Rebalancing policies.
- Choosing anticipatory decisions.

But the real benefit is not measured by the algorithm's name.

It is measured by whether the system has:

- Raised vehicle occupancy.
- Reduced Deadheading.
- Lowered Total VKT.
- Kept Wait/Detour acceptable.
- Served areas fairly.
- Integrated with public transit instead of pulling away its riders.
- And reduced actual emissions per passenger-kilometer.

That is why the better question is not:

> "Should we use MADRL or GNN?"

but rather:

> **What decision do we need to improve, what is the strongest Baseline, and what Metric proves the system improved the city — not just the algorithm?**

## Sources and References

1. Alonso-Mora et al. — On-demand high-capacity ride-sharing via dynamic trip-vehicle assignment, PNAS  
   https://pmc.ncbi.nlm.nih.gov/articles/PMC5255617/

2. FHWA — Analysis of Travel Choices and Scenarios for Sharing Rides  
   https://ops.fhwa.dot.gov/publications/fhwahop21011/ch2.htm

3. Erhardt et al. — Do transportation network companies decrease or increase congestion?, Science Advances  
   https://www.science.org/doi/10.1126/sciadv.aau2670

4. Wenzel et al. — Travel and energy implications of ridesourcing service in Austin, Texas  
   https://doi.org/10.1016/j.trd.2019.03.005

5. KAPSARC — Impacts of Ride-Hailing on Energy and the Environment: A Systematic Review  
   https://www.kapsarc.org/research/publications/impacts-of-ride-hailing-on-energy-and-the-environment-a-systematic-review/

6. Eclipse SUMO — Taxi / Demand Responsive Transport documentation  
   https://sumo.dlr.de/docs/Simulation/Taxi.html

7. Ke, Yang, Zhu — On Ride-Pooling and Traffic Congestion, Transportation Research Part B  
   https://doi.org/10.1016/j.trb.2020.10.003
