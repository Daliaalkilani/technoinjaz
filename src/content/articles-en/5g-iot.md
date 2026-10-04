<!--
FILE: 02-article.md
PURPOSE: Published article content
VERIFICATION DATE: 2026-09-21
-->

SEO Title: How Do 5G Networks Affect the Internet of Things? Speed, Latency, Scale, and 5G-Advanced

Meta Description: A guide explaining the relationship between 5G and the Internet of Things, from eMBB, URLLC, and mMTC to NB-IoT, LTE-M, and RedCap, with practical applications, security, the limits of theoretical figures, and the future of 5G-Advanced and 6G.

Suggested Slug: 5g-iot

# How Do 5G Networks Affect the Internet of Things? Speed, Latency, Scale, and 5G-Advanced

**Fifth-generation networks help expand certain classes of the Internet of Things, thanks to greater connection capacity, lower latency in specific scenarios, and better support for industrial, mission-critical, and device-dense environments. But they are not the right network for every IoT device, and not an automatic replacement for Wi-Fi, Bluetooth, NB-IoT, or LTE-M.**

Discussion of 5G and IoT is often reduced to a simple equation: a faster network means smarter devices. Engineering reality is far more complicated. A water meter running on a single battery for ten years needs none of the speed an industrial high-resolution camera demands, and a production-line robot asks for latency and reliability that mean nothing to a humidity sensor sending a few bytes every hour.

So the useful question is not "Is 5G better for IoT?" but a sharper one that guides this entire article:

> **Which type of connectivity suits the requirements of an IoT device and its use case? And when does 5G add real value?**

## The Internet of Things: A System, Not a Device

The Internet of Things (IoT) is a system of physical devices capable of sensing, measuring, or controlling, and of communicating with other systems over networks. These devices range from temperature and humidity sensors, electricity and water meters, and asset trackers to cameras, industrial robots, and connected medical devices, by way of cars, smart home appliances, agricultural systems, and factory equipment.

But an IoT system is more than "a device connected to the internet." The sensor captures a measurement, the data crosses a **connectivity** layer toward a gateway or network that aggregates it, then reaches an **edge or cloud platform** that processes and analyzes it, and finally the application or automation layer translates the result into an executed decision. The network is one link in this chain, and the whole chain collapses if any link before or after it breaks.

This yields a basic rule: even the fastest network will not rescue an IoT project if the device drains its battery quickly, the data is poor, the platform is insecure, or the application never needed wide-area connectivity in the first place.

### Where Does 5G Fit in This System?

5G's place is specifically the **connectivity layer**. There, it can give some projects high data rates, low latency in specific use cases, the capacity to serve large numbers of devices, and more tunable quality of service. On top of that come architectural tools such as Network Slicing in supporting environments, private networks for factories and facilities, tighter integration with Edge Computing, and options tailored to less complex devices such as RedCap.

Yet this list of capabilities does not mean every device should carry a full 5G modem, as becomes clear the moment you compare three devices from the same IoT world.

### Three Devices, Three Different Priorities

A smart water meter sends a small consumption value a few times a day, so what matters to it is long battery life, good coverage, low cost, and reliability, with a tiny data footprint. Speed barely enters the equation.

![A battery-powered digital water meter with an LCD screen showing consumption in cubic meters, sending its readings wirelessly at 868 MHz](/images/articles/body/5g-iot-2.avif "A wireless digital water meter (868 MHz) running on a battery built to last years: a small consumption value sent every so often, so power and coverage matter more than speed — Source: HelgeRieder, Wikimedia Commons, CC0")

An industrial surveillance camera may send video or computer-vision data, which flips the priorities: higher bandwidth, faster response, and a stable connection. An industrial robot goes further still, possibly needing ultra-low latency, high reliability, precise synchronization, and a controllable local network.

| Device | Data Pattern | Top Priority |
|---|---|---|
| Smart water meter | Small values a few times a day | Battery, coverage, and cost |
| Industrial surveillance camera | Video or computer-vision data | Bandwidth and stability |
| Industrial robot | Control commands and continuous synchronization | Ultra-low latency and reliability |

The takeaway is that no single connectivity technology is ideal for all IoT, and that 5G's value shows only once we know precisely what it added.

## What Did 5G Add? The Three IMT-2020 Scenarios

The IMT-2020 framework associated with the fifth generation defined three primary usage classes, each with reference performance targets. Understanding these classes, and the limits of their figures, is the right entry point for evaluating 5G in any project.

### eMBB — Enhanced Mobile Broadband

Enhanced Mobile Broadband focuses on moving large volumes of data, benefiting applications such as high-definition video, IoT cameras, augmented reality, field inspection devices, and some connected vehicles. The IMT-2020 reference requirements for this scenario include **20 Gbps peak downlink and 10 Gbps peak uplink**.

But these are **peak technical requirements**, not the speed an actual device will get continuously. Real-world speed is the outcome of many factors: the available spectrum, channel bandwidth, the number of users, coverage, the network type, the device's capabilities, MIMO, network load, and the backend infrastructure behind it all.

### URLLC — Ultra-Reliable Low-Latency Communications

Ultra-Reliable Low-Latency Communications was designed for services that need high reliability and low latency together, such as some industrial automation systems, remote control, time-sensitive applications, and private industrial networks. The IMT-2020 standard indicates **1 ms as the User Plane Latency requirement in the URLLC scenario under the defined evaluation conditions**.

This is where one of the most common mistakes lies: the figure does not mean any application running on 5G gets **1 ms end-to-end latency**. The total time an application experiences accumulates across the device itself, network scheduling, the Core Network, the internet, the edge node or cloud, and then the server and application. You must therefore always distinguish between the **radio/user-plane target** and the actual application-to-application latency.

### mMTC — Massive Machine-Type Communications

Massive Machine-Type Communications aims to support a huge number of devices exchanging relatively small amounts of data. Its IMT-2020 reference requirement for connection density is **1,000,000 devices per square kilometer**.

Again, this is a figure within the requirements and evaluation framework, not a promise that any commercial network can run a million devices in any square kilometer with any traffic and data pattern.

![A triangle diagram of the three IMT-2020 scenarios: eMBB with 20 Gbps downlink and 10 Gbps uplink peaks, URLLC with a 1 ms User Plane time, and mMTC with a density of one million devices per square kilometer, with example applications for each](/images/articles/body/5g-iot-3.avif "The three scenarios of the fifth generation and their reference requirements: evaluation figures under defined conditions, not performance promises for any commercial network — Illustration: Techno Enjaz")

## Reading the Numbers Realistically: Speed, Coverage, and Antennas

Those reference figures in turn spawn three popular claims that deserve scrutiny before they slip into any project's feasibility study.

### Is 5G 100 Times Faster than 4G?

The phrase is common, but misleading when presented as a general truth. Theoretical specifications allow a large peak difference, while the user may experience far smaller differences in reality; an advanced, well-covered 4G network can even outperform, in a given location, a 5G network running on limited spectrum or under heavy load.

The reason is that the performance a project cares about is shaped by separate elements: peak theoretical capability, user-experienced throughput, coverage, congestion, and the spectrum band in use. That is why phrases like "5G = 10 Gbps" or "100× faster" must never be used to project an IoT project's performance before an actual on-site test.

### Does 5G Cover a Greater Distance than 4G?

Not necessarily, because coverage depends above all on **frequency**. Each 5G band offers a different trade-off between range and capacity:

| Band | Coverage and Penetration | Speed and Capacity | Note |
|---|---|---|---|
| Low-band | Greater coverage, relatively better penetration | Lower than higher bands | Suits wide areas |
| Mid-band | A good balance | Good capacity | Central to many 5G networks |
| mmWave | Shorter range, higher sensitivity to obstacles | Large bandwidth, potentially very high speeds | Often needs a denser grid of cells |

So the claim "5G has a wider range than 4G" is not a valid rule; the frequency band determines range, not the generation's name.

![A cellular tower carrying passive antennas for low bands and active 5G radio units and antennas for the mid band](/images/articles/body/5g-iot-1.avif "A radio site combining passive antennas for low-band 4G and 5G at the top, radio units in the middle, and active mid-band 3.5 GHz 5G antennas at the bottom — Source: SimplySacha, Wikimedia Commons, CC BY-SA 4.0")

### MIMO's Role and Its Limits in IoT Devices

MIMO stands for Multiple Input Multiple Output, and its function is not limited to sending multiple copies of the signal so that "one copy survives." It is used for Spatial Multiplexing to raise capacity, for Diversity to improve dependability, and for Beamforming to steer radio energy toward the user, all of which improve spectral efficiency. 5G networks rely on Massive MIMO in many scenarios to raise efficiency and capacity, especially in the mid bands.

A small end device is another story: power, size, and cost constraints may prevent it from carrying the same antenna count or the same radio complexity. That constraint is precisely one of the reasons RedCap emerged, though first we should look at the technologies that came before it.

## NB-IoT and LTE-M: The Foundation That Never Retired

One of the most important points lost in simplified explainers is that earlier cellular IoT technologies remain at the heart of the picture. According to the GSMA, **NB-IoT and LTE-M** remain a key foundation of Massive IoT, especially for applications that need low power consumption, low device cost, wide coverage, and long battery life, with a limited data rate.

The numbers confirm it: low-power cellular NB-IoT and LTE-M connections surpassed **one billion active connections by the end of 2025**, according to the GSMA. These technologies find their natural home in smart meters, asset tracking, agriculture, infrastructure sensors, and remote metering devices. Moving to 5G, then, does not mean immediately discarding everything that preceded it.

## RedCap: The Middle Tier Between LPWA and Full 5G

Between these two worlds, a clear gap appeared: IoT devices that need more capability than NB-IoT and LTE-M offer, but not the full complexity, speed, and cost of a 5G modem. **5G RedCap — Reduced Capability** was designed for this gap; 3GPP introduced it in Release 17, then developed it into **eRedCap** in Release 18.

The idea is to cut device complexity, power consumption, and the number of antennas or radio capabilities required, and therefore cost, while keeping features of the 5G environment suited to mid-tier use cases. Prominent examples include wearables, mid-tier cameras and surveillance systems, telemetry, industrial devices, the Smart Grid, connected medical devices, and trackers that need more capability than conventional LPWA.

The GSMA describes RedCap and eRedCap as a layer that practically sits between LPWA technologies such as NB-IoT/LTE-M and full-capability 5G NR. In 2026, the industry continues developing **HD-FDD eRedCap** to further lower power consumption and cost and support Massive IoT on 5G.

![A comparison of three cellular IoT connectivity classes: LPWA such as NB-IoT and LTE-M, 5G RedCap and eRedCap in the middle, and full 5G NR with the highest capability and complexity](/images/articles/body/5g-iot-4.avif "RedCap as a middle layer: more capability than NB-IoT and LTE-M, with a simpler modem than full 5G (channel bandwidth up to 20 MHz in FR1 and one or two receive antennas), while eRedCap lowers the peak to about 10 Mbps — Illustration: Techno Enjaz")

## How Do You Choose the Right Connectivity Technology?

With the map now clear, the practical method follows: do not start from the network's name, start from the device's requirements. The following questions usually settle the choice:

| Question | Why It Matters |
|---|---|
| How much data is there? | Determines the need for bandwidth |
| How often does the device transmit? | Affects power and network sizing |
| What battery life is required? | May rule out high-consumption solutions |
| Is the device mobile? | Affects LTE-M/5G and others |
| What latency is required? | Determines the need for a more time-sensitive network |
| Is the application mission-critical? | Affects reliability and the SLA |
| Is there real coverage? | More important than theoretical specifications |
| What do the modem and subscription cost? | They shape the project's economics |
| Is connectivity local or wide-area? | May make Wi-Fi/BLE sufficient |
| What is the project's lifetime? | Important for network and support availability |
| Does it need direct cloud connectivity? | Or is a local gateway enough? |

### A Conceptual Comparison of the Technologies

Once the answers are clear, the comparison among the available options follows. The table below is conceptual, since actual performance varies with the network, device, frequency, and implementation:

| Technology | Typical Use | Data Rate | Power | Range |
|---|---|---:|---:|---|
| Bluetooth LE | Nearby devices and wearables | Low–medium | Very low | Short |
| Wi-Fi | Home/office/cameras | High | Higher | Local |
| LoRaWAN | Wide-area low-data sensors | Very low | Very low | Wide |
| NB-IoT | Cellular meters and sensors | Low | Low | Wide |
| LTE-M | Tracking and mobile IoT | Low–medium | Low | Wide |
| 5G RedCap/eRedCap | Mid-tier IoT | Medium | Lower than full 5G | Cellular |
| Full 5G NR | Video/industry/high performance | High | Higher | Cellular |

## 5G in the Field: How Applications Are Changing

The selection logic above maps directly onto different sectors, where 5G rarely works alone.

In **factories**, 5G can support equipment sensors, robots, automated guided vehicles (AGVs), inspection cameras, and Predictive Maintenance, along with private networks. But an industrial project does not rest on it alone; Ethernet, Wi-Fi, and other industrial technologies usually coexist in the same environment.

In **smart cities**, loads vary across meters, lighting, parking, infrastructure monitoring, cameras, and transport, so a simple sensor may be content with NB-IoT while a video application needs an entirely different path. In **logistics**, with Asset Tracking, fleet monitoring, cargo sensors, and Cold-chain monitoring, LTE-M, NB-IoT, or RedCap may be more sensible than full-capability 5G.

In **healthcare**, cellular networks can support wearables, remote monitoring, and the transfer of medical device data, but any critical medical use carries special clinical, regulatory, and security requirements that network speed alone cannot meet. In **agriculture**, most cases need wide coverage, low consumption, and small data transmissions, so LPWA is usually a better fit than a full 5G modem. Finally, **vehicles and mobile systems** benefit from cellular coverage, throughput, V2X where supported, and edge processing, while safety requirements remain too broad to reduce to the network connection.

## The Companion Architectural Tools: Edge, Private Networks, and Network Slicing

5G arrives accompanied by three architectural tools that are always mentioned alongside it, and each has limits worth understanding.

### Edge Computing: Processing Where Data Is Born

Sending all data to a distant cloud is not always the best option. Instead, an IoT device sends its data over 5G or a local network to an on-site **edge** node, which handles what is needed locally and uploads only aggregated results to the **cloud**. This gradation gives critical events a fast on-site response, while the cloud retains the storage and deep-analysis capabilities for everything that is not time-critical.

The edge proves its value when we need faster response, less data sent, local video processing, some functions surviving poor external connectivity, or certain data kept from leaving the site. Its textbook example is the factory camera: it does not need to upload every frame to the cloud, but processes video near the plant and then sends detection results, alerts, and aggregated metrics instead of the entire raw video.

![An Edge Computing diagram in a factory: an IoT camera sends raw video over 5G or a local network to an on-site Edge Server, and the server sends only detection results, alerts, and aggregated metrics to the cloud](/images/articles/body/5g-iot-5.avif "Raw video stays on site and is analyzed at the edge; the cloud receives detection results, alerts, and aggregated metrics — Illustration: Techno Enjaz")

### Private 5G Networks

In some factories, ports, and facilities, a private cellular network, known as a Non-Public Network, can be operated. Its potential advantages are greater control over the network, separate security policies, coverage tailored to the site, better QoS where applicable, integration with local systems, and direct management of industrial devices.

But it is not "always better" than Wi-Fi or Ethernet. The decision requires weighing cost, spectrum availability, supported devices, operational expertise, the actual use cases, the degree of mobility needed, and the required quality of service.

### Network Slicing: Logical Slices, Not a Network per Device

Network Slicing does not mean an independent network for each device. It is a mechanism for delivering different logical network characteristics on top of the same 5G infrastructure, according to service and policy. A slice can be designed for a service that needs a different latency, a specific security policy, a defined capacity, or a particular QoS level. Yet having 5G does not automatically mean every operator and every project has advanced Network Slicing commercially available in the same way.

## Security and Scale: What the Network Cannot Solve Alone

### Does 5G Make IoT More Secure?

Not automatically. 5G may bring improvements in authentication, architecture, and policies, but an IoT project remains exposed to risks lying entirely outside the network: default passwords, outdated firmware, insecure updates, leaked keys, weak APIs, over-privileged accounts, cloud misconfiguration, devices abandoned after sale, supply-chain risks, stored sensitive data, and unnecessary ports and services.

That is why security references focus on the device itself. In April 2026, NIST published the revision **NISTIR 8259 Rev. 1** on the foundational activities IoT manufacturers should consider across the product lifecycle, while NISTIR 8259A defines the device's core capabilities:

| Core Capability (NISTIR 8259A) | What It Means |
|---|---|
| Device Identification | A unique identity for the device |
| Device Configuration | The ability to adjust the device's settings |
| Data Protection | Protecting stored and transmitted data |
| Logical Access to Interfaces | Restricting access to interfaces |
| Software Update | Updating software securely |
| Cybersecurity State Awareness | Awareness of the device's security state |

The core idea here:

> Network security does not compensate for an insecure device.

### Can the Network Handle Any Number of Devices?

No. Device density is not just a radio number. A project with large device counts must account for attach storms, devices reconnecting all at once after a power outage, signaling overhead, firmware updates, SIM/eSIM management, and roaming, and then for cloud ingestion capacity, database scalability, and message broker capacity. A million devices each sending one small message every few hours is radically different from a million cameras trying to stream video.

## Beyond Today: 5G-Advanced, Satellites, and 6G

### 5G-Advanced

**Release 18 is the first release officially referred to as part of 5G-Advanced.** It carries IoT-related developments, including RedCap improvements and the introduction of eRedCap, power-saving improvements, development tracks for IoT over non-terrestrial networks, Personal IoT Networks, and improvements for industry, positioning, and vertical applications. The 3GPP track shows that Release 19 became frozen in December 2025, while Release 20 remains open in 2026, confirming that 5G did not stop at its first release but is still evolving.

### Non-Terrestrial Networks (NTN)

Non-Terrestrial Networks extend the idea of connectivity beyond traditional ground towers. For IoT, their value stands out in remote agriculture, the seas, pipelines, mining, areas with little infrastructure, and international tracking, and 3GPP is working on tracks that include supporting IoT over NTN. But satellite connectivity will not replace terrestrial networks; it is an additional coverage layer for specific use cases.

### What About 6G?

In 2026, **6G is not a mature commercial network replacing 5G**. The ITU's official name for the next generation is **IMT-2030**; in February 2026 the ITU working group finished drafting its performance requirements, and in June 2026 the draft evaluation guidelines for candidate radio technologies were completed, while the standardization process continues. In parallel, 3GPP has started Release 20 studies related to 6G architecture, use cases, and protocols. The accurate description today is:

> **6G is in the standardization, study, and development phase, while 5G and 5G-Advanced are the current commercial foundation on which cellular IoT expands.**

## From Theory to Decision

### Common Mistakes in Designing 5G IoT Projects

Certain mistakes recur in real projects; the table below collects them alongside the correction for each:

| Mistake | Correction |
|---|---|
| Starting with "we want 5G" | Start with the use case, then choose connectivity |
| Choosing the network based on speed alone | The battery may matter more than Mbps |
| Using peak speed in the business case | Theoretical peak is not guaranteed real throughput |
| Treating 1 ms as the final application time | End-to-end latency exceeds the radio interface time alone |
| Ignoring operator coverage | Verify coverage and the actually available band |
| Sending all data to the cloud | Use edge or filtering when that helps |
| Ignoring device lifetime | A 10–15-year sensor project needs a strategy for network longevity, firmware, SIM/eSIM, and security updates |
| Connecting every device directly to the internet | Sometimes a local gateway is safer and cheaper |
| Assuming 5G solves security | Security starts with the device, identity, updates, and permissions |

### A Practical Framework for Choosing Connectivity

Before deciding, write down the following values for your project, with real numbers rather than generic estimates:

| Criterion | What to Write Down |
|---|---|
| Payload size | The size of a single message |
| Messages per day | The number of messages per day |
| Peak throughput | The highest data rate required |
| Required latency | The response time required |
| Reliability | The reliability level |
| Battery life | The target battery life |
| Coverage | The coverage available on site |
| Mobility | Whether the device is fixed or mobile |
| Device count | The number of devices |
| Hardware cost | The hardware cost |
| Monthly connectivity cost | The monthly connectivity cost |
| Security classification | The data's security classification |
| Expected product lifetime | The product's expected lifetime |

Then compare BLE, Wi-Fi, Ethernet, LoRaWAN, NB-IoT, LTE-M, RedCap/eRedCap, and Full 5G NR. You will often find that the best architecture combines more than one technology. A realistic design might start with low-power sensors talking over BLE to a nearby gateway that aggregates their data; the gateway forwards it over 5G or fiber to an edge node that processes it locally, and only the distilled findings rise to the cloud. Each technology plays the role it excels at: the sensor preserves its battery, the gateway aggregates, 5G transports quickly, and the edge decides locally. This is about as far as one can get from the naive pattern of giving every sensor its own 5G modem sending straight to the cloud.

## Conclusion

The relationship between 5G and the Internet of Things runs deeper than "more speed." 5G's value comes from its ability to serve different classes of communication: eMBB for heavy data, URLLC for time-sensitive and reliability-critical applications, Massive IoT for large device counts, RedCap/eRedCap to bridge the gap between LPWA and full 5G, private networks for some industrial environments, and then edge, Network Slicing, and NTN as complementary elements depending on the project.

In return, NB-IoT, LTE-M, Wi-Fi, Bluetooth, and other LPWA technologies remain the better choice for a large number of devices. So good design does not start with the question "How do we use 5G?" but with another:

> **What are the device's and application's requirements? And what is the least complex, least costly connectivity technology that meets them securely and reliably?**

## Sources and References

1. ITU — IMT-2020 and Report ITU-R M.2410  
   https://www.itu.int/en/itu-r/study-groups/rsg5/rwp5d/imt-2020/pages/default.aspx  
   https://www.itu.int/pub/R-REP-M.2410/en

2. 3GPP — Release 18 / 5G-Advanced  
   https://www.3gpp.org/ftp/Inbox/Marcoms/A0_size_MC_standards_Rel18.pdf

3. 3GPP — Release status  
   https://portal.3gpp.org/Releases.aspx

4. GSMA — 5G IoT  
   https://www.gsma.com/solutions-and-impact/technologies/internet-of-things/5giot/

5. GSMA — Massive IoT  
   https://www.gsma.com/solutions-and-impact/technologies/internet-of-things/massive-iot/

6. GSMA — 1 billion NB-IoT and LTE-M connections  
   https://www.gsma.com/solutions-and-impact/technologies/internet-of-things/billion-lpwan-connections/

7. GSMA — RedCap/eRedCap for IoT  
   https://www.gsma.com/solutions-and-impact/technologies/internet-of-things/gsma_resources/redcap-eredcap-for-iot/

8. GSMA — Advancing 5G Connectivity for Massive IoT with HD-FDD eRedCap  
   https://www.gsma.com/solutions-and-impact/technologies/internet-of-things/gsma_resources/advance-the-future-of-massive-iot-with-hd-fdd-eredcap/

9. NIST — NISTIR 8259 Series  
   https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-iot-program/nistir-8259-series

10. NIST — IoT Device Cybersecurity Capability Core Baseline  
    https://www.nist.gov/publications/iot-device-cybersecurity-capability-core-baseline

11. ITU — IMT-2030 technical requirements, March 2026  
    https://www.itu.int/hub/2026/03/imt-2030-technical-requirements-for-the-6g-future/

12. ITU — IMT towards 2030 and beyond  
    https://www.itu.int/en/ITU-R/study-groups/rsg5/rwp5d/imt-2030/pages/default.aspx
