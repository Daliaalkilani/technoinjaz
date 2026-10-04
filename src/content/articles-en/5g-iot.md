<!--
FILE: 02-article.md
PURPOSE: Published article content
VERIFICATION DATE: 2026-09-21
-->

SEO Title: How Do 5G Networks Affect the Internet of Things? Speed, Latency, Scale, and 5G-Advanced

Meta Description: A guide explaining the relationship between 5G and the Internet of Things, from eMBB, URLLC, and mMTC to NB-IoT, LTE-M, and RedCap, with practical applications, security, the limits of theoretical figures, and the future of 5G-Advanced and 6G.

Suggested Slug: 5g-iot

# How Do 5G Networks Affect the Internet of Things? Speed, Latency, Scale, and 5G-Advanced

**Fifth-generation networks help expand some classes of the Internet of Things through greater connection capacity, lower latency in specific scenarios, and support for industrial, mission-critical, and highly dense communications. But they are not the right network for every IoT device, and not an automatic replacement for Wi-Fi, Bluetooth, NB-IoT, or LTE-M.**

This distinction matters because discussion of 5G and IoT is often reduced to the phrase: "a faster network means smarter devices." Reality is more complicated.

A water meter running on a ten-year battery does not need the speed an industrial high-resolution camera needs. And a factory robot needs a latency and reliability profile different from a moisture sensor that sends a few bytes every hour.

So the correct question is not:

> Is 5G better for the Internet of Things?

but rather:

> **Which type of connectivity suits the requirements of an IoT device and its use case? And when does 5G add real value?**

## What Is the Internet of Things?

The Internet of Things (IoT) is a system of physical devices capable of sensing, measuring, or controlling, and of communicating with other systems over networks.

These devices may include:

- Temperature and humidity sensors.
- Electricity and water meters.
- Asset trackers.
- Cameras.
- Industrial robots.
- Connected medical devices.
- Cars and vehicles.
- Smart home appliances.
- Agricultural systems.
- Equipment inside factories.

An IoT system usually consists of more than "a device connected to the internet": the sensor or device captures a measurement, the data crosses a **connectivity** layer toward a gateway or network that aggregates it, then reaches an **edge or cloud platform** that processes and analyzes it, and finally the application or automation layer translates the result into an executed decision. The network is one link in this chain, and the whole chain fails if any link before or after it fails.

That is why the network is only one element of the system.

Even the fastest network will not make an IoT project good if the device burns through its battery, the data is poor, the platform is insecure, or the application never actually needed wide-area connectivity in the first place.

# Where Does 5G Fit into the IoT Stack?

5G enters at the **connectivity layer**.

It can give some IoT projects characteristics such as:

- High data rates.
- Low latency in specific use cases.
- Support for very large numbers of devices.
- More tunable quality of service.
- Network Slicing in supporting environments.
- Private networks for factories and facilities.
- Stronger integration with Edge Computing.
- 5G options tailored to less complex devices such as RedCap.

But this does not mean every device needs a full 5G modem.

## Not Every IoT Deployment Needs High Speed

Let's compare:

### A Smart Water Meter

It sends a small consumption value a few times a day.

What matters most:

- A long battery life.
- Good coverage.
- Low cost.
- Reliability.
- A small data footprint.

![A battery-powered digital water meter with an LCD screen showing consumption in cubic meters, sending its readings wirelessly at 868 MHz](/images/articles/body/5g-iot-2.avif "A wireless digital water meter (868 MHz) running on a battery built to last years: a small consumption value sent every so often, so power and coverage matter more than speed — Source: HelgeRieder, Wikimedia Commons, CC0")

### An Industrial Surveillance Camera

It may send video or computer-vision data.

What matters most:

- Higher bandwidth.
- Faster response.
- A stable connection.

### An Industrial Robot

It may need:

- Ultra-low latency.
- High reliability.
- Precise synchronization.
- A controllable local network.

So there is no single ideal connectivity technology for every IoT deployment.

# What Did 5G Add Compared with Previous Generations?

The IMT-2020 framework associated with the fifth generation defined several primary usage classes.

## 1. eMBB — Enhanced Mobile Broadband

Focused on transferring large volumes of data.

Applications that can benefit include:

- High-definition video.
- IoT cameras.
- Augmented reality.
- Field inspection devices.
- Some connected vehicles.

The IMT-2020 reference requirements include **20 Gbps peak downlink and 10 Gbps uplink** in the eMBB scenario.

But these are **peak technical requirements**, not the speed an actual device will get continuously.

Real-world speed depends on:

- The spectrum.
- Channel bandwidth.
- The number of users.
- Coverage.
- The network type.
- The device.
- MIMO.
- Load.
- The network's backend infrastructure.

## 2. URLLC — Ultra-Reliable Low-Latency Communications

Designed for services that need a combination of:

- High reliability.
- Low latency.

Potential examples:

- Some industrial automation systems.
- Remote control.
- Time-sensitive applications.
- Private industrial networks.

The IMT-2020 standard indicates **1 ms as the User Plane Latency requirement in the URLLC scenario under the defined evaluation conditions**.

This does not mean any application running on 5G gets **1 ms end-to-end latency**.

The total time may also include:

- The device.
- Network scheduling.
- The Core Network.
- The internet.
- Edge or Cloud.
- The server.
- The application.

You must therefore distinguish between the **radio/user-plane target** and the actual application-to-application latency.

## 3. mMTC — Massive Machine-Type Communications

Aimed at supporting a huge number of devices with relatively small data.

The IMT-2020 reference requirement for connection density in the mMTC scenario is:

**1,000,000 devices per square kilometer.**

Again, this is a figure within the requirements and evaluation framework, not a promise that any commercial network can run a million devices in any square kilometer with any traffic and data pattern.

![A triangle diagram of the three IMT-2020 scenarios: eMBB with 20 Gbps downlink and 10 Gbps uplink peaks, URLLC with a 1 ms User Plane time, and mMTC with a density of one million devices per square kilometer, with example applications for each](/images/articles/body/5g-iot-3.avif "The three scenarios of the fifth generation and their reference requirements: evaluation figures under defined conditions, not performance promises for any commercial network — Illustration: Techno Enjaz")

# Are NB-IoT and LTE-M Still Important Alongside 5G?

Yes.

And this is one of the most important points lost in simplified explainers.

The GSMA clarifies that **NB-IoT and LTE-M** remain a key foundation of Massive IoT, especially for applications that need:

- Low power consumption.
- Low device cost.
- Wide coverage.
- A limited data rate.
- Long battery life.

And the number of low-power cellular NB-IoT and LTE-M connections surpassed **one billion active connections by the end of 2025**, according to the GSMA.

These technologies suit, for example:

- Smart meters.
- Asset tracking.
- Agriculture.
- Infrastructure sensors.
- Remote metering devices.

So moving to 5G does not mean discarding every previous cellular IoT technology.

# What Is RedCap? And Why Does It Matter for IoT?

A clear problem emerged:

Some IoT devices need more capability than NB-IoT and LTE-M offer, but do not need the full complexity, speed, and cost of a 5G modem.

That is where **5G RedCap — Reduced Capability** comes in.

3GPP introduced RedCap in Release 17, then developed **eRedCap** in Release 18.

The idea is to reduce:

- Device complexity.
- Power consumption.
- The number of antennas or radio capabilities required.
- Cost.

while keeping features of the 5G environment suited to mid-tier use cases.

Potential uses:

- Wearables.
- Mid-tier cameras and surveillance.
- Telemetry.
- Industrial devices.
- Smart Grid.
- Connected medical devices.
- Trackers more capable than conventional LPWA.

The GSMA describes RedCap/eRedCap as a layer that practically sits between LPWA technologies such as NB-IoT/LTE-M and full-capability 5G NR.

In 2026, the industry continues developing **HD-FDD eRedCap** to further reduce power consumption and cost and support Massive IoT on 5G.

![A comparison of three cellular IoT connectivity classes: LPWA such as NB-IoT and LTE-M, 5G RedCap and eRedCap in the middle, and full 5G NR with the highest capability and complexity](/images/articles/body/5g-iot-4.avif "RedCap as a middle layer: more capability than NB-IoT and LTE-M, with a simpler modem than full 5G (channel bandwidth up to 20 MHz in FR1 and one or two receive antennas), while eRedCap lowers the peak to about 10 Mbps — Illustration: Techno Enjaz")

# How Do You Choose the Right Connectivity Technology for an IoT Project?

Instead of starting from the network's name, start from the device's requirements.

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

## A Simplified Comparison

| Technology | Typical Use | Data Rate | Power | Range |
|---|---|---:|---:|---|
| Bluetooth LE | Nearby devices and wearables | Low–medium | Very low | Short |
| Wi-Fi | Home/office/cameras | High | Higher | Local |
| LoRaWAN | Wide-area low-data sensors | Very low | Very low | Wide |
| NB-IoT | Cellular meters and sensors | Low | Low | Wide |
| LTE-M | Tracking and mobile IoT | Low–medium | Low | Wide |
| 5G RedCap/eRedCap | Mid-tier IoT | Medium | Lower than full 5G | Cellular |
| Full 5G NR | Video/industry/high performance | High | Higher | Cellular |

This is a conceptual comparison; actual performance varies with the network, device, frequency, and implementation.

# Is 5G 100 Times Faster than 4G?

The phrase is common but misleading if stated as a general truth.

Theoretical specifications allow a large peak difference, but the user may see far smaller differences in reality.

And an advanced, well-covered 4G network may be faster in a given location than a 5G network using limited spectrum or carrying heavy load.

You must therefore separate:

- Peak theoretical capability.
- User-experienced throughput.
- Coverage.
- Congestion.
- Spectrum band.

And "5G = 10 Gbps" or "100× faster" must never be used to project the performance of an IoT project before an actual test.

# Does 5G Cover a Greater Distance than 4G?

Not necessarily.

Coverage depends heavily on **frequency**.

## Low-band

- Greater coverage.
- Relatively better penetration.
- Lower speeds than higher bands.

## Mid-band

- A good balance between capacity and coverage.
- Central to many 5G networks.

## mmWave

- Large bandwidth.
- Potentially very high speeds.
- Shorter range.
- Higher sensitivity to obstacles.
- Needs a denser grid of cells in many cases.

So the claim "5G has a wider range than 4G" is not a valid rule.

![A cellular tower carrying passive antennas for low bands and active 5G radio units and antennas for the mid band](/images/articles/body/5g-iot-1.avif "A radio site combining passive antennas for low-band 4G and 5G at the top, radio units in the middle, and active mid-band 3.5 GHz 5G antennas at the bottom — Source: SimplySacha, Wikimedia Commons, CC BY-SA 4.0")

# What Is MIMO's Role in 5G and IoT?

MIMO means Multiple Input Multiple Output.

But its function is not limited to sending multiple copies of the signal so that "one copy survives."

MIMO can be used to achieve:

- Spatial Multiplexing to raise capacity.
- Diversity to improve dependability.
- Beamforming to direct radio energy.
- Better spectral efficiency.

5G networks use Massive MIMO in many scenarios to raise efficiency and capacity, especially in the mid bands.

But small IoT devices may not benefit from the same antenna count or complexity because of:

- Power.
- Size.
- Cost.

And this is one reason RedCap exists.

# How Is 5G Changing IoT Applications?

## Factories

It can support:

- Equipment sensors.
- Robots.
- AGVs.
- Inspection cameras.
- Predictive Maintenance.
- Private 5G networks.

But an industrial project does not depend on 5G alone; Ethernet, Wi-Fi, and other industrial technologies usually exist in the same environment.

## Smart Cities

It may include:

- Meters.
- Lighting.
- Parking.
- Infrastructure monitoring.
- Cameras.
- Transport.

The simple sensor may use NB-IoT, while the video application needs a different path.

## Logistics

Such as:

- Asset Tracking.
- Fleet monitoring.
- Cargo sensors.
- Cold-chain monitoring.

Here LTE-M or NB-IoT or RedCap may be more sensible than full 5G.

## Healthcare

Cellular networks can support:

- Wearables.
- Remote monitoring.
- Transferring medical device data.

But any critical medical use needs special clinical, regulatory, and security requirements; a fast network is not enough.

## Agriculture

Many agricultural use cases need:

- Wide coverage.
- Low consumption.
- Small data transmissions.

So LPWA may be more suitable than a full 5G modem.

## Vehicles and Mobile Systems

They can benefit from:

- Cellular coverage.
- Throughput.
- V2X where supported.
- Edge.

But safety requirements do not reduce to the network connection alone.

# What Is Edge Computing's Role with 5G IoT?

Sending all data to a distant cloud is not always ideal.

Processing can be placed closer to the device: an IoT device sends its data over 5G or a local network to an **edge** node on site, which handles what is needed locally and uploads only aggregated results to the **cloud**. This gradation buys fast response to critical events on site, while the cloud retains the storage and deep-analysis capabilities for everything that is not time-critical.

The edge helps when we need:

- Faster response.
- Less data sent.
- Local video processing.
- Some functions surviving poor external connectivity.
- Protecting some data.

Example:

A factory camera does not need to upload every frame to the cloud.

It can process video near the plant and send:

- Detection results.
- Alerts.
- Aggregated metrics.

instead of the entire raw video.

![An Edge Computing diagram in a factory: an IoT camera sends raw video over 5G or a local network to an on-site Edge Server, and the server sends only detection results, alerts, and aggregated metrics to the cloud](/images/articles/body/5g-iot-5.avif "Raw video stays on site and is analyzed at the edge; the cloud receives detection results, alerts, and aggregated metrics — Illustration: Techno Enjaz")

# What Are 5G Private Networks?

In some factories, ports, and facilities, a private cellular network or Non-Public Network can be operated.

Potential benefits:

- Greater control.
- Separate security policies.
- Coverage designed for the site.
- Better QoS where applicable.
- Integration with local systems.
- Managing industrial devices.

But they are not "always better" than Wi-Fi or Ethernet.

The choice requires comparing:

- Cost.
- Spectrum.
- Devices.
- Operational expertise.
- Use cases.
- The need for mobility.
- Quality of service.

# Network Slicing: Does It Mean an Independent Network per Device?

No.

Network Slicing allows delivering different logical network characteristics on top of 5G infrastructure according to the service and policies.

A slice can be designed for a service that needs:

- A different latency.
- A security policy.
- Capacity.
- QoS.

But having 5G does not automatically mean every operator and every project has advanced Network Slicing commercially available in the same way.

# Does 5G Make IoT More Secure?

Not automatically.

5G may bring improvements in authentication, architecture, and policies, but an IoT project remains exposed to many risks:

- Default passwords.
- Outdated firmware.
- Insecure updates.
- Leaked keys.
- Weak APIs.
- Over-privileged accounts.
- Cloud misconfiguration.
- Devices abandoned after sale.
- Supply-chain risks.
- Storing sensitive data.
- Unnecessary ports and services.

In April 2026, NIST published the revision **NISTIR 8259 Rev. 1** on the foundational activities IoT manufacturers should consider across the product lifecycle.

NISTIR 8259A also defines core capabilities including:

- Device Identification.
- Device Configuration.
- Data Protection.
- Logical Access to Interfaces.
- Software Update.
- Cybersecurity State Awareness.

The key idea:

> Network security does not compensate for an insecure device.

# Does More Devices Mean the Network Automatically Handles Them?

No.

Device density is not just a radio number.

The project needs to think about:

- Attach storms.
- Reconnection after a power outage.
- Signaling overhead.
- Firmware updates.
- SIM/eSIM management.
- Roaming.
- Cloud ingestion.
- Database scalability.
- Message broker capacity.

A million devices each sending one small message every few hours is radically different from a million cameras trying to stream video.

# What Does 5G-Advanced Mean for the Internet of Things?

**Release 18 is the first release officially referred to as part of 5G-Advanced.**

It includes IoT-related developments such as:

- RedCap improvements.
- eRedCap.
- Power-saving improvements.
- IoT over non-terrestrial networks in the development tracks.
- Personal IoT Networks.
- Industrial, positioning, and vertical-application improvements.

And the 3GPP track shows Release 19 became frozen in December 2025, while Release 20 remains open in 2026.

This means 5G is not a technology that stopped at its first release; the system is still evolving.

# What Do Satellites Have to Do with the Future of IoT?

Non-Terrestrial Networks — NTN — extend the idea of connectivity beyond traditional ground towers.

For IoT, they can help in:

- Remote agriculture.
- The seas.
- Pipelines.
- Mining.
- Areas with little infrastructure.
- International tracking.

3GPP works on tracks that include supporting IoT over NTN.

This does not mean satellite connectivity will replace terrestrial networks; it adds a new coverage layer for some use cases.

# What About 6G?

In 2026, **6G is not a mature commercial network replacing 5G**.

The ITU's official name for the next generation is **IMT-2030**.

In February 2026, the ITU working group finished drafting the IMT-2030 performance requirements, and in June 2026 the draft evaluation guidelines for candidate radio technologies were completed; the standardization process is still ongoing.

3GPP has also started Release 20 studies related to 6G architecture, use cases, and protocols.

So the accurate statement today is:

> **6G is in the standardization, study, and development phase, while 5G and 5G-Advanced are the current commercial foundation on which cellular IoT expands.**

# Common Mistakes When Designing a 5G IoT Project

## 1. Starting with "We Want 5G"

Start with the use case, then choose connectivity.

## 2. Choosing the Network Based on Speed Alone

The battery may matter more than Mbps.

## 3. Using Peak Speed in the Business Case

Theoretical peak is not guaranteed real throughput.

## 4. Treating 1 ms as the Final Application Time

End-to-end latency exceeds the radio interface time alone.

## 5. Ignoring Operator Coverage

Verify coverage and the actually available band.

## 6. Sending All Data to the Cloud

Use edge or filtering when that helps.

## 7. Ignoring Device Lifetime

A sensor project lasting 10–15 years needs a strategy for:

- Network longevity.
- Firmware.
- SIM/eSIM.
- Security updates.

## 8. Connecting Every Device Directly to the Internet

Sometimes a local gateway is safer and cheaper.

## 9. Assuming 5G Solves Security

Security starts with the device, identity, updates, and permissions.

# A Practical Framework for Choosing Connectivity

Before deciding, write down these values:

```text
Payload size:
Messages per day:
Peak throughput:
Required latency:
Reliability:
Battery life:
Coverage:
Mobility:
Device count:
Hardware cost:
Monthly connectivity cost:
Security classification:
Expected product lifetime:
```

Then compare:

- BLE.
- Wi-Fi.
- Ethernet.
- LoRaWAN.
- NB-IoT.
- LTE-M.
- RedCap/eRedCap.
- Full 5G NR.

You may discover the best architecture uses more than one technology.

A realistic example: low-power sensors communicate over BLE to a nearby gateway that aggregates their data; the gateway forwards it over 5G or fiber to an edge node that processes it locally, and only the distilled findings rise to the cloud. Each technology here plays the role it excels at — the sensor preserves battery, the gateway aggregates, 5G transports quickly, and the edge decides locally. And not:

```text
Every sensor → 5G modem → Cloud
```

# Conclusion

The relationship between 5G and the Internet of Things is not merely one of "more speed."

5G's value comes from its ability to serve different classes of communication:

- eMBB for high data.
- URLLC for time-sensitive and reliability-critical applications.
- Massive IoT for large device counts.
- RedCap/eRedCap to bridge the gap between LPWA and full 5G.
- Private 5G for some industrial environments.
- Edge, Network Slicing, and NTN as complementary elements depending on the project.

In return, NB-IoT, LTE-M, Wi-Fi, Bluetooth, and other LPWA technologies remain suitable for a large number of devices.

So the best design does not start with the question:

> "How do we use 5G?"

but rather:

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
