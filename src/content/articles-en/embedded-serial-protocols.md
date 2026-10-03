<!--
FILE: 02-article.md
PURPOSE: Published article content
VERIFICATION DATE: 2026-09-21
-->

SEO Title: UART vs I2C vs SPI vs RS-232: Choosing a Communication Protocol for Embedded Systems

Meta Description: A practical comparison of UART, I2C, SPI, and RS-232 in embedded systems: wiring, speed, synchronization, addressing, distance, voltage, errors, and the best use for each interface, with an I3C update.

Suggested Slug: embedded-serial-protocols

# UART vs I2C vs SPI vs RS-232: Choosing a Communication Protocol for Embedded Systems

**There is no single communication protocol that is best for every embedded system.**  
The right choice depends on a much simpler question:

> What do you want to connect, over what distance, at what speed, how many devices, and with what voltage and PCB constraints?

In a single project you may find:

- UART for debugging and the Console.
- I²C for sensors.
- SPI for Flash memory or a display.
- RS‑232 for communication with an industrial device or an older computer.

The problem is that these names are sometimes used as if they were fully equivalent technologies, when in fact they are not even on the same level.

The most important example:

> **UART is not RS‑232.**

UART describes an asynchronous serial send/receive mechanism inside the microcontroller or processor, whereas RS‑232 is an electrical and functional interface standard that uses voltage levels different from logic GPIO/UART and usually requires a Transceiver.

So you can have:

```text
MCU UART
   ↓ 3.3 V logic
RS-232 Transceiver
   ↓ ± voltage signaling
RS-232 cable
```

# What Is a Communication Protocol in an Embedded System?

Inside an embedded system we need an agreement between two or more devices on how to exchange data.

This agreement may include:

- The shape of the electrical signal.
- When the bits are read.
- Whether a Clock exists or not.
- Bit ordering.
- How the device is selected.
- Addressing.
- ACK/NACK.
- Error detection.
- Flow control.
- The Frame format.

But not every interface defines all of these layers.

For example:

- **I²C** defines a two-wire Bus with a Clock, addresses, and ACK/Arbitration.
- **SPI** describes a highly simple synchronous Bus, but many of the details of the device's own commands come from its Datasheet.
- **UART** provides asynchronous Framing, but does not by itself define the line voltage or the Connector.
- **RS‑232** defines electrical and functional characteristics of the interface over a serial link.

This is why comparing names alone, without understanding each one's layer, can lead to a wrong design.

# Before Comparing: "Serial" Does Not Always Mean the Same Thing

"Serial Communication" means the bits travel one after another over one line or a small number of lines, instead of sending a large number of bits in parallel.

But Serial interfaces differ radically.

## Asynchronous Communication

There is no shared Clock line.

Example:

**UART**

The two sides agree in advance on the Baud Rate and the Frame format.

## Synchronous Communication

A Clock drives the timing of the transfer.

Examples:

- SPI.
- I²C.

The presence of a Clock simplifies determining the sampling instant, but it adds Signal Integrity constraints at high speed or distance.

# Quick Table: UART vs I²C vs SPI vs RS-232

| Property | UART | I²C | SPI | RS‑232 |
|---|---|---|---|---|
| Synchronization | Asynchronous | Synchronous | Synchronous | Often carries async UART/serial |
| Clock line | No | Yes, SCL | Yes, SCK | Not as a primary data line |
| Primary data lines | TX + RX | SDA + SCL | SCK + data + CS | TX/RX + GND, plus possible Handshake lines |
| Duplex | Usually Full duplex | Half-duplex logically on the bidirectional SDA | Usually Full duplex | Full duplex possible |
| Addressing | No | Yes | No unified Bus addressing; CS usually selects the device | Point-to-point |
| Multiple devices | Needs extra design | Natural | Possible with extra CS lines/other methods | Usually not on the same line |
| Speed | Depends on Hardware/Clock | Standardized modes up to several Mbit/s | No single universal limit; depends on the devices | Usually lower than local PCB interfaces |
| Typical use | Debug, modules, MCU↔MCU | Multiple Sensors/ICs | Flash, ADC, Displays | Industrial devices/Legacy/PC interfaces |
| PCB distance | Good at appropriate speeds | Often short due to capacitance | Often short | Designed more for cables |
| Signal level | CMOS/TTL depending on the device | CMOS/open-drain | Usually CMOS/push-pull | Positive/negative RS‑232 levels |
| Pull-ups | Usually no | Yes | Usually no | No |
| Clock polarity/phase | No | Not in the same way | CPOL/CPHA matter | No |

This is a conceptual comparison. Do not use generic "maximum" figures from an internet table instead of the Datasheets of the specific MCU, peripheral, board, and cable.

# UART: The Simplest Path Between Two Devices

UART stands for:

**Universal Asynchronous Receiver/Transmitter**

It is a Hardware unit found in many microcontrollers and processors.

In its simplest form we need:

```text
Device A TX → Device B RX
Device A RX ← Device B TX
GND ↔ GND
```

There is no Clock line.

How does the receiver know the timing of each Bit?

The two sides agree on a Baud Rate.

Such as:

```text
9600
115200
1000000
```

provided the Hardware supports it within the appropriate Error tolerance.

# What Does a UART Frame Look Like?

One of the best-known settings:

```text
115200 8N1
```

It means:

- 115200 baud.
- 8 Data bits.
- No parity.
- 1 Stop bit.

A simplified Frame:

```text
Idle
  ↓
Start
D0 D1 D2 D3 D4 D5 D6 D7
Stop
```

Parity can be added in other settings.

![A timing diagram of a UART frame showing the idle state, the start bit, the data bits, the optional parity bit, and the stop bit](/images/articles/body/embedded-serial-protocols-1.avif "A UART frame: a start bit, then the data bits, then optional Parity and a stop bit, with the bit time equal to 1 / Baud Rate — Source: AmenophisIII, Wikimedia Commons, CC0")

# What Is the Role of Start and Stop Bits?

Because the two sides do not share a Clock on the wire, the receiver needs to detect the start of the character and then take Samples according to the agreed Baud Rate.

The Start bit marks the beginning of the Frame.

The Stop bit provides the end/required Idle period before the next Frame.

If the two sides' Clocks drift apart more than the Receiver tolerates, you can see:

- Framing errors.
- corrupted bytes.

# What Is Parity, and What Does It Not Do?

Parity adds a Bit that can be used to detect some transmission errors.

Such as:

- Even parity.
- Odd parity.

But the statement:

> "Parity guarantees no information is lost"

is incorrect.

Parity can only detect some error patterns.

It does not provide:

- Error correction.
- A guarantee the message arrives.
- Detection of all multi-bit errors.
- Retransmission.

If message integrity matters, you can add a higher-level Protocol containing:

- CRC.
- sequence number.
- ACK.
- timeout.
- retry.

# Baud Rate or Bit Rate?

The two terms are not synonyms in communications generally.

**Baud** = the number of Symbols per second.

**Bit rate** = the number of bits per second.

In traditional UART, where each Symbol represents a single Bit value, the numerical values are often approximately equal:

```text
115200 baud ≈ 115200 line bits/s
```

But the actual Payload is lower because the Frame contains Start/Stop/Parity.

In 8N1:

```text
1 start + 8 data + 1 stop = 10 bits
```

So 115200 baud theoretically gives about:

```text
11520 bytes/s
```

before any additional protocol.

# Is 115200 UART's Maximum?

No.

115200 is a historically common value, not a universal UART Maximum.

Some microcontrollers support much higher speeds, depending on:

- Peripheral clock.
- Baud-rate divider.
- Oversampling.
- Clock accuracy.
- PCB.
- The other side.

So do not write in your design:

> UART = 115.2 kbps max.

Read the Datasheets of both sides.

# UART Is Not Always 5V TTL

A common mistake:

> UART = TTL.

More accurately:

A UART peripheral operates at the chip's I/O voltage, such as:

- 1.8 V.
- 3.3 V.
- 5 V.

And a 5 V UART must never be connected directly to an input that is not 5V-tolerant.

Check:

- VIH.
- VIL.
- VOH.
- VOL.
- Absolute Maximum Ratings.

You may need:

**a Level Shifter**

between two different voltages.

# Why Is UART Excellent for Debug?

Because it is:

- Simple.
- Needs no Clock.
- Easy with a USB-to-UART adapter.
- Suitable for Console logs.
- Easily monitored with a logic Analyzer.

Example:

```text
MCU UART
   ↓
USB-UART Bridge
   ↓
Laptop Terminal
```

This is why it remains among the first interfaces a Firmware engineer uses when bringing up a board.

# When Is UART Not Suitable?

When you need:

- Multiple devices on the same Bus without extra Hardware.
- Very high Bandwidth between ICs.
- Clocked deterministic transfers.
- Built-in addressing.

Here we usually look at I²C or SPI, or something else.

# RS‑232: Not Just UART at a Higher Voltage

RS‑232 is a historical standard for Point-to-Point serial communication.

The reason the confusion persists:

Many systems use:

```text
UART frames
   ↓
RS-232 electrical transceiver
```

But keeping the two separate matters.

## The UART side

It may be:

```text
0 V / 3.3 V
```

## The RS‑232 side

It uses positive and negative levels, with inverted logic semantics compared with much UART logic.

According to standard RS‑232 explanations:

- Logic 1 / Mark is at a negative voltage.
- Logic 0 / Space is at a positive voltage.
- There is an undefined region around zero in the Receiver thresholds.

That is why **you never connect a UART pin directly to an RS‑232 connector**.

The RS‑232 voltage can destroy the GPIO.

# What Does a MAX232-class Transceiver Do?

It performs two basic functions:

1. Converting voltage levels.
2. Inverting the signal as required.

The picture:

```text
MCU UART 3.3/5V
      ↓
 RS-232 Transceiver
      ↓
 RS-232 Cable
```

Some Transceivers contain a Charge Pump to generate the required voltages from a single low-voltage Supply.

# Does RS‑232 Require DB‑25?

No.

History includes DB‑25, but DB‑9 is very common, and products may use other Connectors too.

The standard is broader than a single Connector shape in every application.

In the simplest link we may use:

```text
TX
RX
GND
```

while other applications use Hardware Flow Control such as:

- RTS.
- CTS.

# DTE and DCE: Why Do These Terms Appear?

RS‑232 was originally developed to connect:

- DTE — Data Terminal Equipment.
- DCE — Data Communication Equipment.

Such as a Terminal/Computer with a Modem.

This historically affects the direction of the Pins.

But in modern embedded systems, practically all that may matter to you is:

- Who transmits on which Pin?
- What is the Connector pinout?
- Do we need a Null-modem/crossover?
- Are RTS/CTS present?

Do not rely on a "TX" label alone before reviewing the Pinout.

# RTS and CTS

In traditional Hardware Flow Control:

- RTS = Request To Send.
- CTS = Clear To Send.

But the Handshake implementation and Pin functions can differ between Hardware, Drivers, and modern modes.

So do not build a circuit from a generic diagram only.

Read:

- The MCU UART manual.
- The Transceiver datasheet.
- The other end.
- Operating-system serial settings.

# Is RS‑232 Length Fixed at 15 Meters?

It is not a hard rule.

The modern specifications historically moved from a fixed Length to electrical constraints such as Capacitance.

The actual distance depends on:

- Cable capacitance.
- Data rate.
- Noise.
- Grounding.
- Transceiver.
- Environment.

The engineering rule:

> The longer the distance or the noisier the industrial environment, the more you should also consider Differential interfaces such as RS‑485 or CAN instead of pushing RS‑232 outside its conditions.

# I²C: Only Two Wires, Multiple Devices on One Bus

I²C stands for:

**Inter-Integrated Circuit**

It was developed by Philips Semiconductors, known today as NXP.

It uses two lines:

```text
SDA = Serial Data
SCL = Serial Clock
```

The key feature:

> Multiple Targets can share the same Bus through Addresses.

Example:

```text
MCU Controller
  │
  ├── Temperature Sensor 0x48
  ├── EEPROM             0x50
  ├── RTC                0x68
  └── IMU                0x6A
```

with shared SDA/SCL lines.

# Why Does I²C Need Pull-up Resistors?

I²C lines traditionally operate with:

**Open-drain / open-collector behavior**

The device pulls the line LOW, but does not drive it HIGH in the usual way.

A Pull-up resistor raises the line to HIGH when no device is pulling it.

Conceptually:

```text
VDD
 |
Rpullup
 |
SDA -------- devices
```

This allows multiple devices to share the line without direct Push-pull conflict.

![An I²C bus diagram with one controller and three Target devices on the SDA and SCL lines, with two Pull-up resistors to Vdd](/images/articles/body/embedded-serial-protocols-2.avif "An I²C bus: a Controller and several Targets share the SDA and SCL lines, with two Pull-up resistors raising the lines to Vdd — Source: Tim Mathias, Wikimedia Commons, CC BY-SA 4.0")

# Is Choosing a Pull-up Just "Always 4.7 kΩ"?

No.

The value depends on:

- Bus capacitance.
- Supply voltage.
- I²C speed.
- The Rise-time requirement.
- Sink-current capability.

4.7 kΩ is common in many examples, but it is not law.

If the Resistance is too large:

- The Rise time becomes slow.

If it is too small:

- Current increases when LOW.
- The device may exceed its sink capability.

# What Are I²C's Current Speeds?

According to the NXP UM10204 Rev. 7 specification:

### Standard-mode

Up to:

**100 kbit/s**

### Fast-mode

Up to:

**400 kbit/s**

### Fast-mode Plus

Up to:

**1 Mbit/s**

### High-speed mode

Up to:

**3.4 Mbit/s**

The specification also defines a unidirectional Ultra Fast-mode up to 5 Mbit/s, which is a different mode and not a common replacement for traditional bidirectional use.

So the old table:

> I²C = 400 kbps max

is incorrect as a general rule.

# How Does an I²C Transaction Start?

In a simple model:

```text
START
Address + R/W
ACK
Data
ACK
Data
ACK
STOP
```

There is also:

- Repeated START.
- NACK.
- 7-bit addressing.
- 10-bit addressing.
- Multi-controller arbitration.
- Clock stretching in supported scenarios.

# Is an I²C Address "Assigned by Philips to Each Device"?

Not like that.

A device's address may be:

- Fixed in the Datasheet.
- Changeable via Pins.
- Configurable in software.
- Within a defined Range.

And there are Addresses reserved for special purposes.

So when choosing several Sensors of the same type, pay attention to:

> Can you change the address?

If three Sensors have the same address and it cannot be changed, you may need:

- An I²C multiplexer.
- A Bus switch.
- Multiple Controllers.
- Another Interface.

# What Are ACK and NACK?

After each Byte, there is an Acknowledge stage.

It helps determine whether the other side responded.

But ACK is not:

- CRC.
- A guarantee of the integrity of the whole Payload.
- Authentication.
- End-to-end confirmation.

If the device is error-sensitive, check whether the Device protocol itself provides:

- Checksum.
- PEC.
- CRC.

# Multi-controller and Arbitration

I²C is not theoretically limited to one controller.

The specification supports Multi-controller and uses Arbitration to prevent data corruption when more than one Controller tries to start at the same time.

But not every MCU driver or RTOS stack handles every Multi-controller scenario easily.

Standard support ≠ easy implementation on your Platform.

# Clock Stretching

Some Targets may hold SCL low to slow the Controller when they need extra time.

But in practice:

- Not every Controller implementation handles it the same way.
- Some systems impose Timeouts.
- Some devices do not use it.

Check the Datasheet instead of assuming behavior.

# Why Is I²C Length Practically Limited?

There is no "1 meter" that works as a rule for all I²C.

The core challenge is:

- Bus capacitance.
- Rise time.
- Noise.
- Pull-up.
- Topology.
- Speed.

I²C was designed primarily for communication between ICs within a device/board.

If you take it over a long Cable, it may work in some conditions at low speeds and with good design, but it becomes more sensitive.

For long industrial cables, better solutions usually exist.

# SPI: Speed and Simplicity at the Cost of More Pins

SPI stands for:

**Serial Peripheral Interface**

It is a synchronous Bus that typically uses:

```text
SCK
MOSI / SDO
MISO / SDI
CS / SS
```

In the traditional naming:

- MOSI = Master Out Slave In.
- MISO = Master In Slave Out.

Some modern documents adopt functional names such as:

- Host / Controller.
- Target / Peripheral.
- SDO / SDI.

The idea is the same: there is a Clock, a transmit line, a receive line, and Device selection.

# Why Is SPI Fast?

Unlike traditional I²C:

- The lines are usually Push-pull.
- There is an independent Data line for each direction.
- There is no unified Address phase per Byte.
- Protocol overhead is low.

So it is excellent for components that need higher Throughput, such as:

- SPI NOR Flash.
- Displays.
- ADC/DAC.
- High-rate sensors.
- FPGAs/peripherals.

# Is SPI's Maximum Speed 10 MHz?

No.

There is no single Universal value for SPI.

Some devices can operate at:

- 1 MHz.
- 10 MHz.
- Tens of MHz.
- More, depending on Device/Mode/PCB.

The real limit comes from:

- Controller.
- Target.
- Setup/hold timing.
- Trace length.
- Loading.
- Voltage.
- Signal integrity.
- Board layout.

An important rule:

> SPI speed is set by the slowest element in the link and the board's timing, not by the name SPI itself.

# SPI Full Duplex

Because there are two separate lines:

```text
Controller → Target
Controller ← Target
```

Bits can be transferred in both directions in the same Clock cycle.

But this does not mean the Application-level protocol always takes advantage of Full Duplex.

Many Chips use Transactions such as:

```text
send command/address
then receive data
```

so the link is electrically Full Duplex, but the actual usage may look logically Half-duplex.

# Multiple Targets on SPI

An older source may describe SPI as Point-to-Point.

But it is very common to have:

```text
SCK  shared
MOSI shared
MISO shared

CS0 → Flash
CS1 → ADC
CS2 → Display
```

So SPI can serve multiple Targets.

![An SPI bus diagram connecting a controller to three devices — Flash, ADC, and Display — via shared SCK, MOSI, and MISO lines, with a separate Chip Select line CS0, CS1, and CS2 for each device](/images/articles/body/embedded-serial-protocols-4.avif "SPI with multiple Targets: the SCK, MOSI, and MISO lines are shared, and each Target has its own CS line, so every additional device costs an extra Pin and routing — illustration: Techno Enjaz")

The problem:

Each Target traditionally needs its own Chip Select.

As the device count grows:

- More Pins.
- More Routing.
- More firmware management.

That is where I²C may be more attractive for many low-data sensors.

# CPOL and CPHA: SPI's Famous Trap

SPI has Modes determined by:

- Clock Polarity — CPOL.
- Clock Phase — CPHA.

So there are four common Modes:

```text
Mode 0
Mode 1
Mode 2
Mode 3
```

If Controller and Target do not agree on the Mode:

- You will see a Clock.
- You will see Data.
- But the Bytes will be wrong.

So the first thing to review when SPI does not work:

> CPOL/CPHA + bit order + CS timing.

![An SPI timing diagram comparing clock polarity CPOL=0 and CPOL=1 and the sampling instants of MOSI and MISO at CPHA=0 and CPHA=1](/images/articles/body/embedded-serial-protocols-3.avif "SPI timing: CPOL defines the clock's idle state, and CPHA defines the edge on which the MOSI and MISO bits are read — Source: Cburnett, Wikimedia Commons, CC BY-SA 4.0")

# Does SPI Have ACK or Addressing?

Not like I²C.

Basic SPI does not offer a Bus-level ACK or unified Addressing.

Each Chip has its own Command protocol in the Datasheet.

A Flash, for example, may use:

```text
0x03 = Read
0x02 = Page Program
0x9F = Read JEDEC ID
```

while another Sensor uses entirely different Commands.

So:

> "SPI" tells you how the bits travel, but it does not necessarily tell you what the bytes mean.

# UART vs SPI: When Do I Choose Each?

## Choose UART when:

- There are only two devices.
- It is a Debug console.
- It is a Modem/GNSS/Bluetooth module.
- You do not want a Clock line.
- The data volume is not huge.
- You need a simple cable within appropriate electrical levels.

## Choose SPI when:

- The Peripheral is on the PCB.
- You need high Throughput.
- It is Flash/Display/ADC.
- The extra Pins are acceptable.
- You can control the Clock timing precisely.

# I²C vs SPI: The Most Famous Comparison

## I²C

Usually better when:

- There are multiple Sensors.
- You want only two lines.
- Bandwidth is medium/low.
- Addressing is useful.

## SPI

Usually better when:

- Speed matters most.
- The device count is small.
- Latency is low.
- Full-duplex is useful.
- Pins are available.

Example of a Sensor Hub board:

```text
I²C:
Temperature
Humidity
RTC

SPI:
High-speed IMU
Flash
Display
```

There is nothing preventing you from using both in the same project.

# UART vs RS‑232: The Correct Comparison

The question:

> UART or RS‑232?

is partly like asking:

> Do I want a Frame format or an electrical layer for a cable?

You can use the MCU's UART and then convert it to:

- RS‑232.
- RS‑485.
- USB via a Bridge.
- Logic-level UART directly.

So RS‑232 is not a direct competitor to UART in every case.

# How Do I Choose the Protocol? A Decision Tree

Start with the first question:

## Is the Other Side Inside the Same PCB?

### Yes

Ask:

**How many devices?**

- One or two devices + high throughput → SPI.
- Multiple Sensors + few Pins → I²C.
- A simple Module/Debug → UART.

### No, There Is a Cable

Ask:

**What is the distance and noise?**

- Short distance and quiet environment → UART logic may be possible depending on the design.
- Legacy/Industrial Point-to-point equipment → RS‑232 may fit.
- Longer distance/noisy environment/multi-drop → also look at RS‑485 or CAN.

# Do Not Choose on Speed Alone

These criteria matter far more:

## 1. Number of Devices

- I²C is excellent for many Targets.
- SPI usually needs a CS per Target.
- UART is usually Point-to-point.

## 2. Pins

With a small MCU:

- I²C saves Pins.
- SPI may consume several Chip Selects.

## 3. Bandwidth

- Display/Flash → usually SPI.
- Temperature sensor → I²C usually suffices.

## 4. Latency

SPI can be direct and fast.

I²C has Address/ACK overhead.

UART has Start/Stop framing.

## 5. Power

Do not judge by the protocol name alone.

Power depends on:

- Frequency.
- Pull-ups.
- Duty cycle.
- Sleep modes.
- The peripheral implementation.

## 6. Software Ecosystem

Ask:

- Is a Driver available?
- Do Linux/RTOS support it?
- Is the Vendor SDK mature?
- Is DMA available?

## 7. Debuggability

UART is usually the easiest for manual Debug.

I²C/SPI often need a Logic Analyzer to understand the timing.

## 8. EMI / Signal Integrity

A fast Clock + long traces can cause problems.

# The Voltage Layer Matters More Than the Protocol Name

Before connecting two devices:

```text
Check VDD
Check VIH/VIL
Check output type
Check 5V tolerance
Check pull-ups
Check absolute maximum
```

Example:

An MCU running at 1.8 V.

An I²C Sensor running at 3.3 V.

Even though both are "I²C," you may need:

**a bidirectional level shifter**

depending on thresholds and circuits.

A protocol-compatible interface does not mean the voltage is compatible.

# Open-drain vs Push-pull

## I²C

Open-drain + Pull-up.

Its characteristics:

- Multiple devices share the line.
- Rise time is RC-limited.
- Wired arbitration is possible.

## SPI/UART Usually

Push-pull.

Its characteristics:

- Faster edges.
- Direct HIGH/LOW drive.
- Never ties two conflicting Outputs together without design.

These electrical differences explain much of the difference in speed and topology.

# Signal Integrity: Why Does It Work on a Breadboard Then Fail in the Product?

SPI may work at 20 MHz on short wires and then fail with a Ribbon cable.

The problem is not always the Firmware.

It may be:

- Ringing.
- Overshoot.
- Crosstalk.
- Ground bounce.
- A poor return path.
- Long stubs.
- Impedance discontinuity.

# Symptoms of Signal Integrity Problems in SPI

- Bits changing randomly as the Clock rises.
- Working at 1 MHz and failing at 20 MHz.
- Flash ID occasionally wrong.
- First Byte correct, the rest corrupted.

Solutions may include:

- Shorter traces.
- A better Ground return.
- Lowering the Clock.
- A series resistor near the Driver.
- Better Layout.
- Scope measurement.

# Symptoms of a Bad I²C Bus

- SDA not rising to HIGH quickly.
- Bus stuck LOW.
- Random NACKs.
- Working with one Sensor and failing when another is added.

Check:

- Pull-up resistance.
- Capacitance.
- Address conflicts.
- Voltage.
- Clock stretching.
- Topology.

# The Logic Analyzer: An Indispensable Tool

A Logic Analyzer can Decode:

- UART.
- I²C.
- SPI.

instead of looking at the raw waveform only.

An I²C example:

```text
START
0x68 W ACK
0x1B ACK
0x00 ACK
STOP
```

You can immediately detect:

- A wrong Address.
- A NACK.
- A Missing STOP.
- A wrong Register.

![A screenshot of the PulseView software showing the SCL and SDA signals and the decoded I²C transaction with a DS1307 clock: START and address 0x68 for writing, then Repeated START and data reads with ACK and NACK, then STOP](/images/articles/body/embedded-serial-protocols-5.avif "I²C decoding in PulseView: START and address 0x68 with W appear, then a Repeated START and reads of the time registers, with each byte followed by ACK until the final NACK and STOP — Source: Joelholdsworth, Wikimedia Commons, CC BY-SA 4.0")

But a Logic Analyzer does not always reveal an Analog edge-quality problem.

That is why for electrical problems:

> Use an Oscilloscope.

# Logic Analyzer or Oscilloscope?

## Logic Analyzer

Excellent for:

- Decoding bytes.
- Long capture.
- Protocol sequence.
- Timing logic.

## Oscilloscope

Excellent for:

- Rise/fall time.
- Overshoot.
- Ringing.
- Noise.
- Voltage thresholds.

The best Debug sometimes uses both.

# Common Design Mistakes

## 1. Connecting UART Directly to RS‑232

May damage the input or simply not work because of the voltage levels.

## 2. I²C Without Pull-ups

The lines will not behave as expected.

## 3. An Unsuitable Pull-up

Causes a slow Rise time or high Current.

## 4. A Wrong SPI Mode

CPOL/CPHA mismatched.

## 5. Assuming a Fixed Protocol Speed

There is no "SPI = 10 MHz" or "UART = 115200 max" law.

## 6. No Shared Ground in a Logic-level Interface

Many Single-ended links need a shared Reference.

## 7. Connecting Two Different Voltages

Protocol-compatible ≠ electrically compatible.

## 8. The Same I²C Address for Two Devices

Leads to a Bus conflict at the response level.

## 9. Cable Length Not Accounted For

A Bus designed for a board may not suit a long run.

## 10. Parity as a Substitute for CRC

Parity is not comprehensive message protection.

# What About RS‑485 and CAN?

When designing an industrial system, a vehicle, or long Cables, do not confine yourself to the four protocols.

## RS‑485

Useful when we need:

- Differential signaling.
- Longer distance.
- Multi-drop.
- Greater noise tolerance.

But RS‑485 mainly defines the electrical layer, and you may need a higher-level Protocol such as Modbus RTU.

## CAN

Suitable when we need:

- A Multi-node bus.
- Arbitration.
- Error detection.
- Industrial/vehicle environments.

So choosing UART/I²C/SPI/RS‑232 is not always the complete list.

# What About USB?

If you want to connect a modern Product to a computer:

USB may be better than native RS‑232.

But inside the device there may be:

```text
MCU UART
   ↓
USB-UART Bridge
   ↓
USB
```

and here the computer sees a Virtual COM Port.

Again: the layers matter.

# The Modern Direction: I3C

As the number of Sensors grows, a need emerged for a Bus that keeps I²C's simplicity but offers newer performance and features.

MIPI developed:

**I3C**

As of 2025, the current releases are:

- MIPI I3C v1.2.
- MIPI I3C Basic v1.2.

I3C uses a Two-wire interface and offers capabilities such as:

- Dynamic addressing.
- In-band interrupts.
- Higher performance.
- Better power management.
- Coexistence with a number of legacy I²C devices on the same Bus under supported conditions.

MIPI describes I3C as a successor to I²C in classes of applications, not an "immediate replacement" for I²C.

MIPI cites a typical data rate of 11.1 Mbit/s, with higher High Data Rate modes reaching about 100 Mbit/s in supported options.

# Will I3C Replace SPI?

Not necessarily.

SPI remains excellent when we need:

- A simple Data path.
- High Throughput.
- The wide Flash/display/peripheral ecosystem.

I3C specifically aims to improve sensor and control Buses, reducing Pins and power with advanced management features.

A project may use:

```text
I3C for sensors
SPI for flash
UART for debug
```

# Modern Terminology: Controller and Target

You will find in older documents:

- Master.
- Slave.

Many modern documents and standards are moving to more function-descriptive terms such as:

- Controller / Target.
- Host / Client.
- Peripheral.

In this article we use **Controller/Target** wherever possible, mentioning the old terms only when they help in understanding older Datasheets.

# Real Performance: Do Not Rely on Clock Frequency Alone

If SPI runs at 20 MHz, that does not always mean:

```text
20 Mbit/s payload
```

because a Transaction may contain:

- Command.
- Address.
- Dummy cycles.
- Chip-select gaps.
- Protocol overhead.

Likewise I²C contains:

- START.
- Address.
- R/W.
- ACK.
- STOP.

And UART contains:

- Start/stop/parity.

So measure:

> Effective application throughput

and not the Clock only.

# Example 1: Temperature Sensor

Requirements:

- 2 bytes per second.
- Multiple Sensors.
- Speed unimportant.
- Few Pins.

The logical choice is usually:

**I²C**

# Example 2: External NOR Flash

Requirements:

- Reading large blocks.
- Speed.
- A limited number of devices.

The choice:

**A SPI/QSPI-class interface**, depending on the Device.

# Example 3: GPS/GNSS Module

Requirements:

- Periodic textual/binary messages.
- A direct link.
- Easy Debug.

Usually:

**UART**

# Example 4: An Old Industrial Measurement Device

Requirements:

- A cable.
- An existing Port.
- Point-to-point.
- Compatibility matters more than speed.

It may be:

**RS‑232**

# Example 5: Dozens of Modern Sensors

If the platform and devices support it:

**I3C** may be attractive because of:

- Two wires.
- Dynamic addressing.
- In-band interrupts.
- Bandwidth higher than traditional I²C.

# A Practical Selection Matrix

| Need | The Option to Start Examining |
|---|---|
| Debug Console | UART |
| A simple Sensor | I²C |
| Multiple Sensors on two lines | I²C / I3C |
| High-speed Flash | SPI |
| Display | SPI |
| High-data ADC | SPI |
| Simple MCU↔Module | UART |
| Legacy industrial point-to-point | RS‑232 |
| Long noisy Cable | Often RS‑485 / CAN |
| Automotive multi-node | CAN / LIN depending on requirements |
| Modern sensor aggregation | I3C where support is available |

This is not a final verdict; Datasheets and requirements are the decisive factor.

# Checklist Before Choosing the Interface

Write down these values:

```text
Number of devices:
Required payload bandwidth:
Maximum latency:
Cable/trace length:
Supply voltages:
Available GPIO pins:
Need addressing?:
Need full duplex?:
Need hot-plug?:
Noise environment:
Power budget:
MCU peripheral availability:
DMA required?:
OS/driver support:
Expected product lifetime:
```

Then compare the options.

# Checklist Before Running the First Prototype

## UART

- [ ] TX ↔ RX crossed correctly.
- [ ] Ground shared.
- [ ] Same baud.
- [ ] Same data bits.
- [ ] Same parity.
- [ ] Same stop bits.
- [ ] Voltage compatible.
- [ ] Not accidentally RS‑232 voltage.

## I²C

- [ ] SDA/SCL correct.
- [ ] Pull-ups installed.
- [ ] Pull-ups to the correct voltage.
- [ ] Address correct.
- [ ] Address conflict checked.
- [ ] Bus speed supported by all devices.
- [ ] Rise time acceptable.

## SPI

- [ ] SCK correct.
- [ ] MOSI/SDO and MISO/SDI correct.
- [ ] CS pin correct.
- [ ] CPOL correct.
- [ ] CPHA correct.
- [ ] Bit order correct.
- [ ] Max SCK within Target timing.
- [ ] CS setup/hold timing respected.

## RS‑232

- [ ] Transceiver exists between the logic UART and the cable.
- [ ] TX/RX pinout checked.
- [ ] DTE/DCE assumptions checked.
- [ ] RTS/CTS configured if needed.
- [ ] Connector pinout verified.

# Security: These Interfaces Do Not Automatically Encrypt Your Data

UART/I²C/SPI/RS‑232 are not security protocols.

If an attacker gains physical access to:

- A UART debug header.
- SPI flash.
- The I²C bus.

they may be able to:

- Read data.
- Capture Firmware.
- Send Commands.
- Tamper with the Peripheral.

So in sensitive products:

- Disable Debug interfaces at production as needed.
- Use Secure Boot.
- Enable flash protection.
- Verify firmware signatures.
- Do not store Secrets as plaintext in external flash.
- Build a Threat Model for physical access.

# Conclusion

The choice between UART, I²C, SPI, and RS‑232 is not settled by a single speed table.

Think of them as different tools:

## UART

A simple asynchronous serial link, excellent for Debug and modules.

## I²C

A two-wire Bus with addressing, excellent for sensors and multiple devices on a PCB.

## SPI

A fast, low-overhead synchronous Bus, excellent for memories, displays, and high-data components.

## RS‑232

A Point-to-point electrical interface for cables and legacy/industrial systems, usually needing a Transceiver between the logic UART and the line.

## I3C

A modern evolution of Sensor/Control buses that combines a Two-wire architecture with Dynamic addressing and more advanced performance and management features.

Instead of asking:

> "Which protocol is faster?"

ask:

> **What is the least complex interface that achieves the required Bandwidth, distance, device count, power, and reliability within the design's actual electrical constraints?**

## Sources and References

1. NXP Semiconductors — UM10204, I2C-bus specification and user manual, Rev. 7.0  
   https://www.nxp.com/docs/en/user-guide/UM10204.pdf

2. MIPI Alliance — I3C and I3C Basic  
   https://www.mipi.org/specifications/i3c-sensor-specification

3. MIPI Alliance — I3C Basic v1.2  
   https://www.mipi.org/mipi-i3c-basic-download

4. Microchip — SPI Mode Overview  
   https://onlinedocs.microchip.com/

5. Texas Instruments — UART protocol and error overview  
   https://www.ti.com/video/6313217959112

6. Texas Instruments — Universal Asynchronous Receiver/Transmitter user documentation  
   https://www.ti.com/lit/ug/sprugp1/sprugp1.pdf

7. Analog Devices — Fundamentals of RS-232 Serial Communications  
   https://www.analog.com/en/resources/technical-articles/fundamentals-of-rs232-serial-communications.html

8. Analog Devices — RS232 Quick Guide  
   https://www.analog.com/media/en/technical-documentation/product-selector-card/rs232%20quick%20guide.pdf
