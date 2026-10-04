<!--
FILE: 02-article.md
PURPOSE: Published article content
VERIFICATION DATE: 2026-09-21
-->

SEO Title: How Do 5G Networks Work Technically? 5G NR, OFDM, MIMO, and Fronthaul Explained

Meta Description: A technical guide to understanding what happens inside a 5G network: from 5G NR, OFDM, and Numerology to MIMO, Beamforming, fading, Fronthaul, and RU/DU/CU architecture, with 5G-Advanced and Release 19 updates.

Suggested Slug: 5g-nr-radio-architecture

# How Do 5G Networks Work Technically? 5G NR, OFDM, MIMO, and Fronthaul Explained

**A 5G network is not just "faster 4G."** The real difference shows up in the design of the 5G NR radio interface, flexible spectrum usage, adaptable OFDM, MIMO and Beamforming, the split of the radio access network into functions such as RU, DU, and CU — plus a new Core designed for a wider range of services.

To understand 5G from an engineering perspective, it helps to trace how data actually travels through the system. The journey begins at the **User Equipment** — the phone or connected device — which generates and consumes the data and reaches the radio access network wirelessly over the **5G NR radio interface**, the set of protocols and physical channels that define how the signal is modulated, coded, and transmitted across the spectrum.

On the other side of the link stands the **gNB** base station, which in 5G is not a monolithic block but a functionally split chain that can be distributed geographically: the **Radio Unit (RU)** sits near the antenna and handles analog and high-frequency processing; the **Distributed Unit (DU)** manages the real-time-critical layers such as scheduling, HARQ, and the MAC layer; and the **Centralized Unit (CU)** takes care of higher, less latency-sensitive layers such as RRC session management. This split allows RUs to be deployed at remote cell sites over fiber while DU and CU functions stay centralized, cutting cost and simplifying operations.

Behind the access network lies the **5G Core**, built on a service-based architecture, which handles session management, mobility, authentication, and policy — and finally routes traffic toward the **data network**: the internet, cloud services, or an **edge** that places compute close to the user to reduce latency. Each link in this chain is a subject in its own right, but this article concentrates on the first two: the radio access network and the physical layer.

# What Is the Difference Between 5G and 5G NR?

**5G** is the name of the complete system.

**NR — New Radio**, on the other hand, is the radio interface developed by 3GPP for the fifth generation.

The 3GPP 38.xxx specification series describes NR in detail, including:

- TS 38.211 for physical channels and modulation.
- TS 38.212 for multiplexing and channel coding.
- TS 38.213 for physical-layer control procedures.
- TS 38.214 for data transfer procedures.
- TS 38.300 for the overall description of NR and NG-RAN.

So when we talk about:

- OFDM.
- Subcarrier spacing.
- Modulation.
- Beam management.
- MIMO.
- Physical channels.

we are, in most cases, inside the world of **5G NR**.

# What Are the Core Components of a 5G Network?

It can be simplified into three parts.

## 1. UE — User Equipment

This is the device connected to the network, such as:

- A phone.
- A 5G modem.
- A router.
- An industrial device.
- A RedCap device.
- An in-vehicle communication unit.

## 2. NG-RAN

The radio access network.

The main node is called the **gNB**.

However, a gNB is not always a single physical box; its functions can be split into:

- RU — Radio Unit.
- DU — Distributed Unit.
- CU — Centralized Unit.

This split matters in modern networks and Open RAN.

## 3. 5G Core — 5GC

It handles functions such as:

- Registration and authentication.
- Session management.
- Mobility.
- Policy.
- User data routing.
- Network slicing.
- Access to Data Networks.

The core specification for the 5GS architecture is **3GPP TS 23.501**, and it continues to evolve in recent Releases.

# What Is the Difference Between NSA and SA?

## Non-Standalone — NSA

In early deployment phases, many networks used 5G NR together with parts of the LTE/EPC architecture.

This allowed operators to launch 5G quickly without fully migrating to a new Core.

## Standalone — SA

It uses:

- 5G NR.
- 5G Core.

Here, 5G's architectural capabilities appear in fuller form, such as:

- Network slicing.
- Service-based architecture.
- Advanced industrial capabilities.
- More flexible QoS management.

So the presence of a "5G" icon on your phone does not by itself tell you which architecture is in use.

![Comparison between NSA architecture, where the device connects to an LTE anchor for control and to a gNB for additional data with EPC, and SA architecture, where the device connects directly to a gNB with 5G Core](/images/articles/body/5g-nr-radio-architecture-4.avif "In NSA, LTE remains the control anchor and EPC is used, while 5G NR adds data capacity; in SA, NR works with 5G Core, enabling capabilities such as Network Slicing and the service-based architecture — illustration: Techno Enjaz")

# How Does 5G Use the Spectrum?

A common mistake is reducing 5G to mmWave.

5G NR can operate across different frequency ranges.

In practice, it helps to think in terms of:

## Low Bands

These typically provide:

- Better coverage.
- Relatively better penetration.
- Lower capacity compared with higher bands.

## Mid Bands

These have become among the most important commercial 5G layers because they balance:

- Coverage.
- Bandwidth.
- Capacity.

## High Frequencies / FR2

They enable wider channels and large capacity, but signal propagation becomes more difficult, increasing the importance of:

- Beamforming.
- Site density.
- Line of sight.
- Handling obstructions.

As NR has expanded, the specifications have extended to higher frequencies, up to 71 GHz bands in recent 3GPP releases.

# Why Can't Coverage Be Tied to the "5G" Name Alone?

Because propagation characteristics depend on frequency and environment.

A low-frequency 5G network may cover a large distance.

5G at a very high frequency, on the other hand, may:

- Weaken faster with distance.
- Be more affected by obstacles.
- Need Beamforming.
- Need more densely deployed cells.

So the statement:

> "5G has a shorter range than 4G"

is not universally true.

Likewise:

> "5G covers more than 4G"

is not universally true.

The right question is:

**Which band, at what power, with which antennas, and in which environment?**

# What Is OFDM and Why Does 5G Use It?

OFDM stands for:

**Orthogonal Frequency Division Multiplexing**

The core idea is to divide a wide channel into a large number of orthogonal Subcarriers.

Instead of sending a single Stream over one wide carrier, the transmission is spread across multiple Subcarriers.

![Representation of an OFDM signal in the time and frequency domains showing overlapping, orthogonal subcarriers within a 5 MHz bandwidth](/images/articles/body/5g-nr-radio-architecture-1.avif "OFDM signal in the frequency and time domains: orthogonal subcarriers overlap spectrally without interfering at the sampling points, with symbols separated by guard intervals — Source: IngesO7, Wikimedia Commons, CC0")

This helps handle efficiently:

- Multipath channels.
- Frequency selectivity.
- Resource allocation.
- Wide bandwidths.

5G NR uses OFDM on the downlink, and OFDM-based waveforms on the uplink as well.

But the important innovation is not "using OFDM" per se, since LTE uses OFDM too.

The key difference is **greater flexibility in Numerology**.

# What Is Numerology in 5G NR?

In LTE, 15 kHz Subcarrier Spacing was the baseline reference.

NR, by contrast, was designed to support multiple values of Subcarrier Spacing.

In NR's baseline design:

```text
15 kHz
30 kHz
60 kHz
120 kHz
240 kHz
```

With later extensions toward higher bands, additional options appeared for certain scenarios.

Why?

Because a network operating at:

- Low frequency.
- Large cell size.
- Narrower channels.

does not face the same requirements as one operating at very high frequencies.

## Smaller Subcarrier Spacing

It usually means a longer Symbol duration.

It may be better suited to some low-frequency bands.

## Larger Subcarrier Spacing

It means shorter Symbols.

It helps deal with certain characteristics of higher frequencies and different timing requirements.

Numerology therefore gives NR the flexibility to choose a time/frequency structure suited to the use case.

# What Is a Resource Block?

The network does not statically grant a user a "whole frequency."

Resources are divided into time-frequency units that the Scheduler can allocate.

A Resource Block in NR consists of **12 Subcarriers** in the frequency domain.

Its width in hertz, however, changes with the Subcarrier Spacing.

For example:

- At 15 kHz, the width of 12 subcarriers is smaller.
- At 30 or 60 kHz, it becomes wider.

This is part of NR's flexibility.

# What Does the Cyclic Prefix Do?

Wireless channels are not a single straight path.

The signal may arrive via:

- A direct path.
- A reflection from a building.
- A reflection from a vehicle.
- Scattering.
- Multiple paths.

Delayed copies of the signal therefore arrive.

OFDM adds a **Cyclic Prefix** to help reduce the Inter-Symbol Interference caused by Multipath, within design limits.

![Block diagram of an OFDM modulator followed by cyclic prefix insertion, copying the last part of the symbol to its beginning](/images/articles/body/5g-nr-radio-architecture-2.avif "Cyclic Prefix insertion: the last part of the IFFT-generated OFDM symbol is copied and prepended, extending the symbol duration from N to N+N_CP samples — Source: Fvultier, Wikimedia Commons, CC BY-SA 4.0")

But the Cyclic Prefix is not a magic fix for every channel problem; delay length and environment characteristics still matter.

# How Does the Network Choose Modulation and Coding?

NR does not use a single Modulation order all the time.

Depending on channel quality, a more or less aggressive Modulation/Coding choice can be made.

Examples of Modulation used in NR include:

- QPSK.
- 16QAM.
- 64QAM.
- 256QAM in supported scenarios.

In parts of the uplink, specific BPSK/π/2-BPSK variants exist.

The idea:

## Good Channel

Higher-order Modulation can be used:

> More Bits per Symbol.

## Poor Channel

The network lowers the Modulation or uses more conservative Coding.

This is the essence of **Adaptive Modulation and Coding — AMC**.

# What Is MCS?

MCS stands for:

**Modulation and Coding Scheme**

It is an index that helps determine a combination of:

- Modulation order.
- Coding rate.

according to channel conditions and the procedures in use.

The higher the signal quality, the higher the MCS that can usually be selected, achieving greater Throughput.

When the channel degrades, the system lowers the MCS to improve the probability of correct reception.

But claiming the system reaches a "near-zero error rate" is an incorrect generalization; the goal is to operate within defined Targets using mechanisms such as:

- Coding.
- HARQ.
- Retransmission.
- Link adaptation.

# What Is Channel Coding in 5G?

LTE relied heavily on Turbo Codes.

5G NR, by contrast, adopted:

- **LDPC** primarily for user data channels.
- **Polar Codes** for some control channels.

This is an important point when comparing LTE and NR.

So Turbo Codes should not be described as the central data coding in 5G NR.

# Why Is the Wireless Channel Difficult?

A signal in transit does not face mere "distance."

Three concepts must be distinguished:

## 1. Path Loss

The average reduction in power as distance, environment, and frequency increase.

## 2. Shadowing

A slower variation in power caused by large obstacles such as:

- A building.
- A hill.
- A wall.

## 3. Small-scale Fading

Faster variations resulting from the interference of multipath signal copies and movement.

These phenomena do not mean the same thing.

# What Is Multipath?

The signal reaches the receiver over more than one path. The simplest picture is the direct link: the base station transmits toward the user in line of sight, so that copy covers the shortest distance and arrives first, with the strongest power. In urban environments, however, the radio wave rarely travels that path alone; a wave reflected off a glass facade or a concrete wall is deflected from its original course and covers a much longer route before reaching the very same device, arriving a fraction of a microsecond behind the direct copy.

That delay is not a marginal detail — it determines how the signal behaves at the receiver: the two paths differ in length, and therefore in **arrival time**, and therefore in the **phase** at which each copy lands. When the two copies combine at the user's antenna they may reinforce each other, producing a signal stronger than either path alone, or they may partially cancel and collapse the received signal abruptly — which is one source of Fading, addressed by techniques such as MIMO and the subcarrier structure of OFDM.

# Are Reflection, Refraction, and Scattering the Whole Story?

They are important propagation mechanisms, but modern channel modeling involves more than a simple three-item list.

The channel also depends on:

- Frequency.
- Doppler.
- Delay spread.
- Angle of arrival.
- Angle of departure.
- Line-of-sight / NLOS.
- Polarization.
- Mobility.
- Urban, indoor, or rural environment.

5G systems therefore use more sophisticated channel models for testing and simulation.

# What Is Diversity?

The idea is to give the system more than one chance to receive the information over non-identical paths or resources.

Types include:

## Time Diversity

Sending Redundancy across different times.

## Frequency Diversity

Using different frequencies or Subcarriers.

## Spatial Diversity

Using multiple antennas or independent Spatial paths.

## Coding Diversity

Using Channel Coding to spread the information and enable error correction.

But modern 5G systems do not rely solely on the idea of "sending the same copy several times."

MIMO can also use the spatial domain **to increase capacity**, not only for diversity.

# What Is MIMO?

MIMO stands for:

**Multiple Input Multiple Output**

It means using multiple antennas at one or both ends of the link.

But MIMO can serve different goals.

## 1. Spatial Diversity

Improved Reliability.

## 2. Spatial Multiplexing

Sending different Streams in parallel to increase the Data Rate.

## 3. Beamforming

Shaping the radiation pattern to direct energy more effectively toward a given direction.

This differs radically from the simplified explanation:

> "MIMO sends the same signal several times until one copy gets through."

That describes the Diversity mode only, not MIMO as a whole.

# What Is Massive MIMO?

When a base station has a large number of antenna elements, it can exploit the spatial domain to a much greater degree.

![Two 5G network active antennas mounted on a telecom tower](/images/articles/body/5g-nr-radio-architecture-3.avif "Two 5G network active antennas, each integrating a large antenna element array with the radio unit — the common form of Massive MIMO deployment in mid bands — Source: SimplySacha, Wikimedia Commons, CC BY-SA 4.0")

This helps with:

- Forming Beams.
- Serving multiple users.
- Improving spectral efficiency.
- Increasing capacity.

But the number of physical elements does not necessarily equal the number of Spatial Layers each user gets.

It depends on:

- The channel.
- The device.
- The number of users.
- The frequency.
- The network configuration.

# What Is Beamforming?

Instead of broadcasting power equally in all directions, an antenna array can shape a radiation pattern that focuses the signal.

At high frequencies, this capability becomes critical because:

- Path loss is higher.
- Antennas are smaller.
- Denser Arrays can be built.

Beamforming does not mean a fixed "laser beam."

The Beam may change with:

- User movement.
- Conditions.
- Measurements.
- Beam management.

In Release 19, 3GPP continued developing MIMO and Beam Management, including support for **UE-initiated/event-driven beam management** in the NR MIMO Phase 5 work.

# What Does MIMO Have to Do with Fading?

Multipath is not always an enemy.

If the Spatial paths differ enough, MIMO can exploit them.

For example:

- Diversity to improve reliability.
- Multiplexing to increase capacity.

In other words, the multipath environment that causes Fading can also become a useful resource for a MIMO system when the channel is favorable.

# What Is Maximal Ratio Combining — MRC?

MRC is a Diversity Combining method.

If we receive copies of the signal over several branches:

```text
Branch 1
Branch 2
Branch 3
```

we do not give them the same weight.

MRC gives greater Weight to the branches with better channel quality and then combines them.

In an idealized model with channel knowledge, this improves the resulting SNR compared with relying on a single branch.

But MRC is a classical diversity concept and should not be presented as the algorithm that explains every Receiver in modern 5G.

NR receivers use a broader set of:

- Channel estimation.
- Equalization.
- MIMO detection.
- Coding.
- HARQ.
- Beam processing.

# What Is the Difference Between SNR and SINR?

## SNR

Signal-to-Noise Ratio.

It compares signal power to noise.

## SINR

Signal-to-Interference-plus-Noise Ratio.

It adds interference to the noise.

In a real cellular network, SINR is often more meaningful because a user may be affected by:

- Other cells.
- Other users.
- Beams.
- Inter-cell interference.

# Why Does Theoretical 5G Speed Differ from Real-World Speed?

The final Throughput is affected by:

- Bandwidth.
- Modulation.
- Coding rate.
- Number of Spatial layers.
- Carrier aggregation.
- Channel quality.
- Scheduler.
- Number of users.
- TDD configuration.
- Protocol overhead.
- Core/backhaul.
- Server.
- The device itself.

So there is no equation:

> 5G = a single speed number.

Even on the same network, two users in different locations can see very different results.

# What Is Fronthaul?

This is an important technical point in RAN architecture.

When we split base station functions, we need links between the parts.

In simplified form, the links run in series: from the Radio Unit over the **Fronthaul** to the Distributed Unit, then over the **Midhaul** to the Centralized Unit, and finally over the **Backhaul** to the 5G Core. Each link in this chain carries different timing and capacity requirements: the closer a link sits to the radio, the more demanding its synchronization needs become, which is why the Fronthaul is the most demanding link in the entire chain. Terminology and splits vary by architecture, but the constant idea is that the **Fronthaul is closest to the radio**.

![A split RAN chain from the Radio Unit RU to DU, then CU, then 5G Core, with Fronthaul links between RU and DU, Midhaul between DU and CU, and Backhaul between CU and the core network](/images/articles/body/5g-nr-radio-architecture-5.avif "Fronthaul between RU and DU is the most demanding in timing, synchronization, and capacity, followed by Midhaul between DU and CU, then Backhaul toward the Core; in O-RAN, Open Fronthaul defines the interface between O-RU and O-DU using the 7.2x split — illustration: Techno Enjaz")

# Is the RRH + BBU Model Still Enough to Explain 5G?

It is historically useful, but no longer sufficient on its own.

Modern design talks more about:

- RU.
- DU.
- CU.
- Functional splits.
- Virtualized RAN.
- Open RAN.

So Fronthaul today should not be reduced to merely:

> RRH ↔ BBU

alone.

# What Are IEEE 1914.1 and 1914.3?

**IEEE 1914.1-2019** defines the architecture and requirements for Packet-based fronthaul transport networks, including requirements for:

- Data rate.
- Timing.
- Synchronization.
- QoS.
- Functional partitioning.

**IEEE 1914.3-2023** is the current active version of the Radio over Ethernet Encapsulations and Mappings standard, having superseded the 2018 edition.

The modern version covers transporting Radio protocols over:

- Ethernet frames.
- IP packets.

It includes mechanisms for managing mapping/demapping and OAM.

This is an important update compared with references that rely only on IEEE 1914.3-2018.

# Where Does O-RAN Fit In?

O-RAN is not the same as 5G and does not replace 3GPP.

3GPP defines many of the cellular network's functions and protocols.

The O-RAN Alliance, meanwhile, develops specifications for open, virtualized, and intelligent RAN interfaces.

The best-known example:

**Open Fronthaul between O-RU and O-DU using Lower Layer Split Option 7.2x.**

In 2026, O-RAN continued updating specifications and interoperability tests for this interface.

The goal is to improve:

- Interoperability.
- Multi-vendor supply.
- RAN management.
- Testing.

But "Open" does not mean every vendor's components integrate without testing; Conformance and Interoperability Testing remain essential.

# What Is the Difference Between Fronthaul and Backhaul?

## Fronthaul

It connects the RAN segments closest to the radio.

Its requirements can be stringent in:

- Latency.
- Synchronization.
- Jitter.
- Throughput.

## Backhaul

It connects the RAN to the core network or aggregation networks.

Its requirements are usually different.

Because of Massive MIMO and wide channels, Fronthaul can become a major challenge if huge amounts of raw I/Q are transported.

That is why Functional Splits emerged to distribute processing more practically.

# Why Are Timing and Synchronization Important?

The radio network depends on precise timing.

Especially in:

- TDD.
- Coordinated transmission.
- Industrial time-sensitive networking.
- Some forms of MIMO.
- Distributed radio systems.

Bandwidth is therefore not the only measure of Fronthaul quality.

You may have a very fast link that is still unsuitable if it fails to meet the requirements for:

- Latency.
- Jitter.
- Timing.
- Synchronization.

# How Does 5G Technology Relate to the Internet of Things?

Not through "speed alone."

Different RAN characteristics serve different devices.

## A Simple Sensor

It may use:

- NB-IoT.
- LTE-M.

It does not need Full NR high throughput.

## RedCap

It reduces 5G complexity for some devices that fall between LPWA and full-capability 5G.

## An Industrial Camera

It benefits from:

- Bandwidth.
- Edge.
- QoS.
- Private 5G.

## A Robot or AGV

It may care more about:

- Reliability.
- Latency.
- Mobility.
- Handover.
- Deterministic behavior.

So the article "how 5G works technically" should be kept separate from the article "when IoT needs 5G."

# What Is 5G-Advanced?

The industry uses the name **5G-Advanced** for the next evolutionary phase of 5G, and **3GPP Release 18** is the first Release in this phase.

Areas that evolved with it include:

- MIMO.
- Positioning.
- Energy efficiency.
- RedCap.
- XR.
- AI/ML support.
- NTN.
- Industrial capabilities.

## What About Release 19?

According to the current 3GPP portal:

- Release 18: Frozen.
- Release 19: Frozen since December 2025.
- Release 20: Open in 2026.
- Release 21: Open.

Release 19 includes additional evolutions in NR, among them the continued development of:

- MIMO.
- Beam management.
- Mobility.
- Duplexing.
- Power saving.

So "5G" in 2026 is not a frozen specification that stopped at Release 15.

# Has 6G Replaced 5G?

No.

In 2026, 6G/IMT-2030 is still at the stage of:

- Requirements.
- Standardization.
- Studies.
- Evaluation of candidate technologies.

Meanwhile, 5G and 5G-Advanced are the commercial system being developed and deployed.

# Common Mistakes in Explaining 5G

## "5G = mmWave"

Wrong. 5G operates in many bands.

## "5G Is Always 100 Times Faster"

Wrong. Peak capability is not the user experience.

## "MIMO Only Sends a Backup Copy of the Signal"

Incomplete. MIMO also uses Spatial Multiplexing and Beamforming.

## "5G Always Covers a Greater Distance"

Wrong. Coverage depends on the Band and the environment.

## "Fronthaul = a Cable Between RRH and BBU"

A historical explanation, far too simplified for modern architecture.

## "Every IoT Device Needs 5G"

Wrong. Connectivity should follow the device's requirements.

## "1 ms Is the Normal Ping in 5G"

Wrong. Benchmark figures relate to specific scenarios and layers, not a guarantee for any End-to-end application.

## "Turbo Coding Is the Foundation of 5G"

Inaccurate. NR relies on LDPC for user data and Polar Codes for specific control channels.

# A Practical Framework for Understanding 5G Link Performance

When analyzing a network, do not ask about "signal strength" only.

Examine:

```text
Frequency band
Channel bandwidth
Subcarrier spacing
RSRP
RSRQ
SINR
MCS
Number of MIMO layers
Beam state
Scheduler load
TDD pattern
Latency
Packet loss
Backhaul
Core path
Server location
```

A user may have good RSRP but poor Throughput because of:

- Low SINR.
- Congestion.
- Limited Bandwidth.
- Scheduler load.
- Backhaul.

And a user may have relatively weaker RSRP with good Throughput if:

- SINR is good.
- The channel is wide.
- MIMO layers are available.
- The network is not congested.

# Conclusion

5G networks are not a single technology; they are a set of layers working together.

In the radio:

- NR.
- OFDM.
- Flexible numerology.
- Adaptive modulation and coding.
- LDPC/Polar coding.
- MIMO.
- Beamforming.
- Channel estimation.

In the access network:

- gNB.
- RU.
- DU.
- CU.
- Fronthaul.
- Synchronization.
- Open interfaces.

And behind them:

- 5G Core.
- QoS.
- Edge.
- Service architecture.

And when the channel changes, all these layers work together to deal with:

- Path loss.
- Shadowing.
- Multipath.
- Fading.
- Interference.
- Mobility.

This is why 5G performance cannot be explained by a single number such as "10 Gbps" or "1 ms."

Real understanding starts from:

> **Spectrum + channel + physical layer + antennas + architecture + load + the entire data path.**

## Sources and References

1. 3GPP — TS 38.211: NR; Physical channels and modulation  
   https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=3213

2. 3GPP — TS 38.214: NR; Physical layer procedures for data  
   https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=3216

3. 3GPP — TS 38.300: NR and NG-RAN Overall Description  
   https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=3191

4. 3GPP — TS 23.501: System architecture for the 5G System  
   https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=3144

5. 3GPP — Release status  
   https://portal.3gpp.org/Releases.aspx

6. IEEE — IEEE 1914.1-2019: Packet-based Fronthaul Transport Networks  
   https://standards.ieee.org/standard/1914_1-2019.html

7. IEEE — IEEE 1914.3-2023: Radio over Ethernet Encapsulations and Mappings  
   https://standards.ieee.org/ieee/1914.3/10629/

8. O-RAN Alliance — Specifications  
   https://www.o-ran.org/specifications

9. O-RAN Alliance — 2026 technical document updates / Open Fronthaul 7.2x  
   https://www.o-ran.org/blog/59-new-or-updated-o-ran-technical-documents-released-since-march-2026

10. ITU — IMT-2020  
    https://www.itu.int/en/itu-r/study-groups/rsg5/rwp5d/imt-2020/pages/default.aspx
