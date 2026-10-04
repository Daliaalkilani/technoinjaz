<!--
FILE: 02-article.md
PURPOSE: Published article content
VERIFICATION DATE: 2026-09-21
-->

SEO Title: How Do 5G Networks Work Technically? 5G NR, OFDM, MIMO, and Fronthaul Explained

Meta Description: A technical guide to understanding what happens inside a 5G network: from 5G NR, OFDM, and Numerology to MIMO, Beamforming, fading, Fronthaul, and RU/DU/CU architecture, with 5G-Advanced and Release 19 updates.

Suggested Slug: 5g-nr-radio-architecture

# How Do 5G Networks Work Technically? 5G NR, OFDM, MIMO, and Fronthaul Explained

**A 5G network is not just "faster 4G."** The real difference lies in the design of the 5G NR radio interface, its flexibility in using spectrum, adaptable OFDM, MIMO and Beamforming, the split of the radio access network into functions such as RU, DU, and CU, and a new Core designed for a wider range of services.

The best way to understand 5G as an engineer is to follow the journey of data through the system as it actually unfolds on the ground. The journey starts at the **User Equipment**, the phone or connected device that generates and consumes data, which connects wirelessly to the radio access network over the **5G NR radio interface**: the set of protocols and physical channels that define how the signal is modulated, coded, and transmitted across the spectrum.

On the other side stands the **gNB** base station, which in 5G networks is not a single block but a functional chain that can be distributed geographically. The **Radio Unit (RU)** sits near the antenna and handles analog and high-frequency RF processing, the **Distributed Unit (DU)** manages the layers closest to real time, such as scheduling, HARQ, and the MAC layer, while the **Centralized Unit (CU)** deals with higher layers that are less sensitive to delay, such as RRC session management. This split allows RUs at remote sites to be connected over fiber while the DU and CU stay in central locations that lower cost and simplify operations.

Behind the access network lies the **5G Core**, built on a Services-Based architecture, which handles session management, mobility, authentication, and routing, and then steers data toward the **data network**: the internet, cloud services, or the **edge**, which brings computing closer to the user to cut latency. Each link in this chain is a subject in its own right, but this article focuses on its first links: the radio access network and the physical layer.

## From 5G to 5G NR: The System and the Radio Interface

### The Difference Between 5G and 5G NR

**5G** is the name of the whole system, while **NR — New Radio** is the radio interface 3GPP developed for the fifth generation. The 3GPP 38.xxx specification series describes NR in detail, most notably:

| Specification | Subject |
|---|---|
| TS 38.211 | Physical channels and modulation |
| TS 38.212 | Multiplexing and Channel Coding |
| TS 38.213 | Physical layer control procedures |
| TS 38.214 | Data transfer procedures |
| TS 38.300 | Overall description of NR and NG-RAN |

So whenever the conversation turns to OFDM, subcarrier spacing, modulation, beam management, MIMO, or physical channels, we are usually inside the world of **5G NR**.

### The Network's Core Components

A 5G network can be simplified into three parts. The first is the **UE — User Equipment**, the device connected to the network, whether a phone, a 5G modem, a router, an industrial device, a RedCap device, or a communications unit inside a vehicle.

The second is **NG-RAN**, the radio access network, whose main node is called the **gNB**. As we saw in the introduction, a gNB is not always a single physical box; its functions can be split into the RU — Radio Unit, DU — Distributed Unit, and CU — Centralized Unit, a split that is central to modern networks and to Open RAN.

The third is the **5G Core — 5GC**, which handles registration and authentication, session management, mobility, policy, traffic routing, Network slicing, and access to Data Networks. The core specification for the 5GS architecture is **3GPP TS 23.501**, and it continues to evolve in recent releases.

### NSA and SA: Two Ways to Deploy

In early deployment phases, many networks used the **Non-Standalone — NSA** mode, which combines 5G NR with part of the LTE/EPC infrastructure, making it possible to launch 5G quickly without a full move to a new Core.

The **Standalone — SA** mode uses 5G NR together with the 5G Core, and this is where 5G's architectural capabilities appear more completely, such as some forms of Network slicing, the service-based architecture, advanced industrial capabilities, and more flexible quality-of-service management. That is why a "5G" icon on a phone does not, by itself, tell you which architecture is in use.

![Comparison between NSA architecture, where the device connects to an LTE anchor for control and to a gNB for additional data with EPC, and SA architecture, where the device connects directly to a gNB with 5G Core](/images/articles/body/5g-nr-radio-architecture-4.avif "In NSA, LTE remains the control anchor and EPC is used, while 5G NR adds data capacity; in SA, NR works with 5G Core, enabling capabilities such as Network Slicing and the service-based architecture — illustration: Techno Enjaz")

## Spectrum: Where the Physics Begins

### 5G Bands and Their Characteristics

A common mistake is reducing 5G to mmWave, when 5G NR can operate across different frequency bands, each with its own personality:

| Band | What It Offers | What It Requires or Limits |
|---|---|---|
| Low bands | Better coverage and relatively better penetration | Lower capacity than higher bands |
| Mid bands | A balance of coverage, bandwidth, and capacity | Have become one of the most important commercial 5G layers |
| High frequencies / FR2 | Wider channels and large capacities | Harder propagation, and greater importance of Beamforming, site density, line of sight, and handling obstacles |

As NR has expanded, the specifications in recent 3GPP releases have reached bands up to 71 GHz.

### Why Coverage Is Not Tied to the "5G" Name

Because propagation characteristics depend on frequency and environment, not on the generation's name. A low-frequency 5G network may cover a large distance, whereas 5G on a very high frequency weakens faster with distance, is more affected by obstacles, and needs Beamforming and denser cells. So the statement "5G has a shorter range than 4G" is not true in absolute terms, and neither is "5G covers more than 4G." The right question is always: **Which band, at what power, with which antennas, and in what environment?**

## The Physical Layer: OFDM, Numerology, and Transmission Resources

Once the spectrum is chosen, the question becomes how to load data onto it, and this is where the physical layer begins.

### OFDM: Splitting the Channel into Orthogonal Carriers

OFDM stands for **Orthogonal Frequency Division Multiplexing**. Its core idea is to split a wide channel into a large number of orthogonal subcarriers, so that instead of sending a single stream on one wide carrier, the transmission is spread across many subcarriers.

![Representation of an OFDM signal in the time and frequency domains showing overlapping, orthogonal subcarriers within a 5 MHz bandwidth](/images/articles/body/5g-nr-radio-architecture-1.avif "OFDM signal in the frequency and time domains: orthogonal subcarriers overlap spectrally without interfering at the sampling points, with symbols separated by guard intervals — Source: IngesO7, Wikimedia Commons, CC0")

This split helps deal efficiently with multipath channels, frequency selectivity, resource allocation, and large bandwidths. 5G NR uses OFDM in the downlink and OFDM-based waveforms in the uplink as well. But the innovation is not the use of OFDM alone, since LTE uses it too; the essential difference is the **greater flexibility in Numerology**.

### Numerology: Flexible Spacing Between Carriers

In LTE, a 15 kHz subcarrier spacing was the basic reference. NR, by contrast, was designed to support multiple values: its base design includes 15, 30, 60, 120, and 240 kHz, and later extensions toward higher bands brought additional options for some scenarios.

The reason is that a network operating at low frequency with a large cell and narrower channels does not share the requirements of one operating at very high frequencies. A smaller spacing usually means a longer symbol duration and may suit some low bands better. A larger spacing means shorter symbols, helping cope with some characteristics of higher frequencies and with different timing requirements. Numerology thus gives NR the freedom to choose the time/frequency structure that fits the use case.

### The Resource Block: The Unit of Allocation

The network does not give a user a "whole frequency" on a fixed basis; resources are divided into time and frequency units that the scheduler allocates. A Resource Block in NR consists of **12 subcarriers** in the frequency domain, but its width in hertz changes with subcarrier spacing: at 15 kHz the twelve subcarriers are narrower, and at 30 or 60 kHz they become wider. This is another face of NR's flexibility.

### The Cyclic Prefix: A Safety Margin Against Echoes

The wireless channel is not a single straight path; the signal may arrive over a direct path, by reflection off a building or a vehicle, and through scattering and other multiple paths, so delayed copies of it reach the receiver. That is why OFDM adds a **Cyclic Prefix** to help reduce Inter-Symbol Interference caused by multipath, within the limits of the design.

![Block diagram of an OFDM modulator followed by cyclic prefix insertion, copying the last part of the symbol to its beginning](/images/articles/body/5g-nr-radio-architecture-2.avif "Cyclic Prefix insertion: the last part of the IFFT-generated OFDM symbol is copied and prepended, extending the symbol duration from N to N+N_CP samples — Source: Fvultier, Wikimedia Commons, CC BY-SA 4.0")

But the Cyclic Prefix is not a magic fix for every channel problem; delay length and environmental characteristics remain decisive.

## Link Adaptation: Modulation and Coding

### Adaptive Modulation and Coding (AMC)

NR does not use a single modulation level all the time; it picks a modulation and coding combination with a degree of aggressiveness that matches channel quality. The modulation schemes used include QPSK, 16QAM, 64QAM, and 256QAM in supported scenarios, plus BPSK and π/2-BPSK formats in specific parts of the uplink.

The logic is simple: on a good channel, the modulation level can be raised to carry more bits per symbol, and on a poor channel the network lowers the modulation or falls back on more conservative coding. This is the essence of **Adaptive Modulation and Coding — AMC**.

### MCS: The Index That Translates Channel Quality

The **Modulation and Coding Scheme** is an index that sets the combination of modulation order and coding rate according to channel conditions and the adopted procedures. The higher the signal quality, the more often a higher MCS can be chosen and greater throughput achieved; when the channel weakens, the system lowers the MCS to raise the probability of correct reception.

Yet claiming that the system reaches "a near-zero error rate" is an incorrect generalization; the goal is to operate within specific targets, aided by mechanisms such as coding, HARQ, retransmission, and link adaptation.

### Channel Coding: From Turbo to LDPC and Polar

LTE relied mainly on Turbo Codes, whereas 5G NR adopted **LDPC** primarily for user data channels and **Polar Codes** for some control channels. This is a key point when comparing the two generations, so Turbo Codes should not be described as the central data coding of 5G NR.

## The Wireless Channel: Why Is It Hard?

All the adaptation mechanisms above exist because the wireless channel is a hostile, fluctuating environment, and a signal in transit faces more than mere "distance."

### Three Phenomena That Must Be Kept Apart

| Phenomenon | Definition | Rate of Change |
|---|---|---|
| Path Loss | The average drop in power with distance, environment, and frequency | An overall average |
| Shadowing | A change in power caused by large obstacles such as a building, hill, or wall | Slower |
| Small-scale Fading | Changes caused by interference between multipath copies of the signal and by motion | Faster |

These three phenomena do not mean the same thing, and conflating them leads to a wrong diagnosis of link performance.

### Multipath: When the Signal Arrives by More Than One Route

The simplest form of a link is the direct path: the base station transmits toward the user in line of sight, and the signal travels the shortest possible distance, arriving first and with the most energy. But in an urban environment the radio wave rarely takes that path alone; a wave reflected off the façade of a glass building or a concrete wall is deflected from its original course and travels a much longer route before reaching the same user device, lagging the direct copy by a small fraction of a microsecond.

That delay is no marginal detail; it is what decides how the signal behaves at the receiver. The two paths differ in length, hence in **arrival time**, hence in the **phase** at which each copy arrives. When the two copies combine at the receiver antenna, they may reinforce each other into a signal stronger than either path alone, or cancel out so the whole signal suddenly weakens. This is the essence of multipath fading, one of the sources of fading that techniques such as MIMO and OFDM address.

### Beyond Reflection, Refraction, and Scattering

Reflection, refraction, and scattering are important propagation mechanisms, but modern channel modeling goes beyond this triad. The channel is also shaped by frequency, Doppler shift, delay spread, the angles of arrival and departure, the presence or absence of line of sight (LOS/NLOS), polarization, mobility, and the nature of the environment, whether urban, indoor, or rural. That is why 5G systems rely on more complex channel models for testing and simulation.

### Diversity: More Than One Chance to Catch the Information

The idea of diversity is to give the system more than one chance to receive the information through non-identical paths or resources. It takes several forms: **Time Diversity**, sending redundancy across different times; **Frequency Diversity**, using different frequencies or subcarriers; **Spatial Diversity**, using multiple antennas or independent spatial paths; and **Coding Diversity**, using channel coding to spread information and enable error correction.

But modern 5G systems do not stop at the idea of "sending the same copy several times"; MIMO can use the spatial domain **to increase capacity** too, not only for diversity.

## MIMO and Beamforming: Exploiting the Spatial Domain

### MIMO and Its Three Goals

**Multiple Input Multiple Output** means using several antennas at one or both ends of the link. It can be harnessed for three different goals: **Spatial Diversity** to improve reliability, **Spatial Multiplexing** to send different streams in parallel and raise the data rate, and **Beamforming** to shape the radiation pattern and steer energy better in a given direction.

This differs fundamentally from the simplified explanation that "MIMO sends the same signal several times so one gets through," which describes the Diversity mode alone, not MIMO as a whole.

### Massive MIMO

When a base station has a large number of antenna elements, it can exploit the spatial domain to a much greater degree.

![Two 5G network active antennas mounted on a telecom tower](/images/articles/body/5g-nr-radio-architecture-3.avif "Two 5G network active antennas, each integrating a large antenna element array with the radio unit — the common form of Massive MIMO deployment in mid bands — Source: SimplySacha, Wikimedia Commons, CC BY-SA 4.0")

This helps form beams, serve multiple users at once, improve spectral efficiency, and increase capacity. But the number of physical elements does not necessarily equal the number of spatial layers each user receives; that depends on the channel, the device, the number of users, the frequency, and the network configuration.

### Beamforming

Instead of radiating energy equally in all directions, an antenna array can shape a radiation pattern that concentrates the signal. This capability grows in importance at high frequencies, because path loss there is higher and antennas are smaller, which allows denser arrays to be built.

Beamforming does not mean a fixed "laser beam"; the beam changes with user movement, conditions, measurements, and beam management procedures. In Release 19, 3GPP continued developing MIMO and Beam Management, including support for **UE-initiated/event-driven beam management** within the NR MIMO Phase 5 work.

### Multipath: From Enemy to Resource

Multipath is not always an enemy; if the paths are spatially different enough, MIMO can exploit them, either through diversity to improve reliability or through spatial multiplexing to increase capacity. In other words, the multipath environment that causes fading can become a useful resource for a MIMO system when the channel is suitable.

### Maximal Ratio Combining — MRC

MRC is a classic diversity combining method. If we receive copies of the signal over several branches, we do not give them equal weight; instead, we give more weight to branches with better channel quality and then combine them. In an ideal model with full channel knowledge, this improves the resulting SNR compared with relying on a single branch.

But MRC should not be presented as the algorithm that explains every modern 5G receiver; NR receivers rely on a broader system that includes channel estimation, equalization, MIMO detection, coding, HARQ, and beam processing.

## Measuring Link Quality: From SINR to Real Speed

### SNR and SINR

**SNR — Signal-to-Noise Ratio** compares signal power with noise, while **SINR — Signal-to-Interference-plus-Noise Ratio** adds interference to the noise. In a real cellular network, SINR is usually more telling, because the user is affected by other cells, other users, neighboring beams, and inter-cell interference.

### Why Theoretical Speed Differs from Real Speed

Final throughput is the outcome of a long chain of factors: bandwidth, modulation, coding rate, the number of spatial layers, carrier aggregation, channel quality, the scheduler, the number of users, the TDD configuration, protocol overhead, and then the Core and backhaul path, the server, and the device itself. So there is no equation that reduces 5G to a single speed figure; two users on the same network in two different places may see very different results.

## Behind the Radio: Fronthaul and the Open RAN Architecture

From the physical layer, we move to the architecture that links the parts of the base station to each other and to the network.

### Fronthaul, Midhaul, and Backhaul

Once a base station's functions are split, links are needed between its parts. Put simply, the chain runs from the radio unit over the **Fronthaul** to the distributed unit, then over the **Midhaul** to the centralized unit, and finally over the **Backhaul** to the 5G core network. Each link has different timing and capacity requirements: the closer a link sits to the radio, the more sensitive it is to timing and synchronization, which is why the Fronthaul is the most demanding link in the chain. Terminology and splits may differ by architecture, but the constant idea is that **Fronthaul is closest to the radio**.

![A split RAN chain from the Radio Unit RU to DU, then CU, then 5G Core, with Fronthaul links between RU and DU, Midhaul between DU and CU, and Backhaul between CU and the core network](/images/articles/body/5g-nr-radio-architecture-5.avif "Fronthaul between RU and DU is the most demanding in timing, synchronization, and capacity, followed by Midhaul between DU and CU, then Backhaul toward the Core; in O-RAN, Open Fronthaul defines the interface between O-RU and O-DU using the 7.2x split — illustration: Techno Enjaz")

### Fronthaul Versus Backhaul

The Fronthaul links the RAN parts close to the radio, and its requirements can be severe in latency, synchronization, jitter, and throughput. The Backhaul links the RAN to the core network or to aggregation networks, and its requirements are usually different. With Massive MIMO and wide channels, the Fronthaul can become a major challenge if huge volumes of raw I/Q samples are transported, which is why Functional Splits emerged to distribute processing more practically.

### Why the RRH + BBU Model Is No Longer Enough

The RRH + BBU model is historically useful, but it is no longer sufficient on its own to explain 5G. Modern design talks about the RU, DU, and CU, about functional splits, and about Virtualized RAN and Open RAN. So the Fronthaul today should not be reduced to a mere link between an RRH and a BBU.

### The IEEE 1914.1 and 1914.3 Standards

**IEEE 1914.1-2019** defines the architecture and requirements of packet-based fronthaul transport networks, including data rate, timing, synchronization, QoS, and functional partitioning.

**IEEE 1914.3-2023** is the current active edition of the Radio over Ethernet Encapsulations and Mappings standard and has superseded the 2018 edition. The new edition covers transporting radio protocols over Ethernet frames and IP packets, and includes mechanisms for managing mapping/demapping and OAM. This is an important update compared with references that still rely solely on IEEE 1914.3-2018.

### Where Does O-RAN Fit?

O-RAN does not equal 5G and does not replace 3GPP. 3GPP defines many of the cellular network's functions and protocols, while the O-RAN Alliance develops specifications for open, virtualized, and intelligent interfaces in the RAN. One of its best-known examples is **Open Fronthaul between the O-RU and O-DU using Lower Layer Split Option 7.2x**, whose specifications and conformance tests O-RAN continued updating in 2026.

The aim is to improve interoperability, enable multi-vendor deployments, and advance RAN management and testing. But "Open" does not mean every vendor's components integrate without testing; conformance and interoperability testing remain essential.

### Timing and Synchronization

A radio network relies on precise timing, especially in TDD, coordinated transmission, industrial time-sensitive networking, some forms of MIMO, and distributed radio systems. That is why bandwidth is not the only measure of Fronthaul quality; you may have a very fast link that is still unsuitable if it does not meet latency, jitter, timing, and synchronization requirements.

## From Technology to the Internet of Things

Technical 5G does not relate to IoT through "speed" alone, but because different RAN characteristics serve different devices. A simple sensor may be content with NB-IoT or LTE-M and has no need for the high throughput of full NR, while RedCap reduces 5G's complexity for devices that sit between LPWA and full-capability 5G. An industrial camera benefits from bandwidth, the edge, QoS, and private networks, whereas a robot or automated guided vehicle (AGV) cares more about reliability, latency, mobility, handover, and deterministic behavior. That is why the question "How does 5G work technically?" must be kept separate from the question "When does IoT need 5G?"

## Continuous Evolution: 5G-Advanced, Release 19, and 6G

### 5G-Advanced

The industry calls the next evolutionary phase of 5G **5G-Advanced**, and **3GPP Release 18** is the first release within it. Areas that evolved with it include MIMO, positioning, energy efficiency, RedCap, extended reality (XR), AI/ML support, non-terrestrial networks (NTN), and industrial capabilities.

### What About Release 19?

According to the current 3GPP portal, the release status is as follows:

| Release | Status |
|---|---|
| Release 18 | Frozen |
| Release 19 | Frozen since December 2025 |
| Release 20 | Open in 2026 |
| Release 21 | Open |

Release 19 brings further NR developments, including continued work on MIMO, beam management, mobility, duplexing, and power saving. "5G" in 2026 is not a fixed specification that stopped at Release 15.

### Has 6G Replaced 5G?

No. In 2026, 6G/IMT-2030 is still in the phase of requirements, standardization, studies, and evaluation of candidate technologies, while 5G and 5G-Advanced remain the commercial system being developed and deployed.

## Common Mistakes in Explaining 5G

Simplified explainers repeat claims that sound self-evident but are wrong or incomplete; the table below collects them with corrections:

| Claim | Correction |
|---|---|
| "5G = mmWave" | Wrong; 5G operates in many bands |
| "5G is always 100 times faster" | Wrong; peak capability does not equal user experience |
| "MIMO only sends a backup copy of the signal" | Incomplete; MIMO also uses Spatial Multiplexing and Beamforming |
| "5G always covers a greater distance" | Wrong; coverage depends on the band and the environment |
| "Fronthaul = a cable between an RRH and a BBU" | A historical, overly simplified explanation of modern architecture |
| "All IoT needs 5G" | Wrong; connectivity should follow the device's requirements |
| "1 ms is the normal ping on 5G" | Wrong; standardized figures relate to specific scenarios and layers and are no guarantee for any end-to-end application |
| "Turbo Coding is the foundation of 5G" | Inaccurate; NR relies on LDPC for user data and Polar Codes for specific control channels |

## A Practical Framework for Understanding 5G Link Performance

When analyzing a network's performance, do not stop at asking about "signal strength." The full picture requires checking a set of indicators distributed across the system's layers:

| Layer | Indicators to Check |
|---|---|
| Spectrum and channel | Frequency band, Channel bandwidth, Subcarrier spacing |
| Signal quality | RSRP, RSRQ, SINR |
| Link adaptation and antennas | MCS, Number of MIMO layers, Beam state |
| The cell | Scheduler load, TDD pattern |
| End-to-end performance | Latency, Packet loss, Backhaul, Core path, Server location |

Reading these indicators together reveals paradoxes that signal strength alone cannot explain. A user may have good RSRP yet weak throughput because of low SINR, congestion, little bandwidth, scheduler load, or a backhaul bottleneck. Conversely, a user may have relatively weaker RSRP yet good throughput if SINR is good, the channel is wide, MIMO layers are available, and the network is not congested.

## Conclusion

5G networks are not a single technology but layers working together. In the radio, NR, OFDM, flexible numerology, adaptive modulation and coding, LDPC/Polar coding, MIMO, Beamforming, and channel estimation combine. In the access network, the gNB operates through its RU, DU, and CU, along with the Fronthaul, synchronization, and open interfaces. And behind them stands the 5G Core, with QoS, the edge, and the service-based architecture.

When the channel changes, all these layers work in concert to cope with path loss, shadowing, multipath, fading, interference, and mobility. That is why 5G performance cannot be explained by a single number such as "10 Gbps" or "1 ms"; real understanding starts from:

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
