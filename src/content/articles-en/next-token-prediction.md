<!--
FILE: 02-article.md | PURPOSE: Published article content
-->

SEO Title: How Do AI Models Predict the Next Word? From N-gram to Transformers

Meta Description: A practical explanation of how the next word or token is predicted in language models, from N-gram, RNN, and LSTM to Transformers, with generation strategies, the challenges of the Arabic language, and the Jais and ALLaM models.

Suggested Slug: next-token-prediction

# How Do AI Models Predict the Next Word? From N-gram to Transformers

**Generative language models rest on a task that looks simple on the surface: estimating what is likely to come after the current context.** But in modern models, it is more accurate to speak of **Next Token Prediction** rather than literally the next word, because text is usually split into units called tokens, each of which may be a whole word, part of a word, a punctuation mark, or another unit.

From this core idea, language modeling systems evolved through successive generations: they began with statistical models such as N-grams, then moved to the recurrent neural networks RNN and LSTM, until they reached Transformers and today's large language models.

The real leap was not in changing the core question, but in **how context is represented**: from counting the preceding words, to compressing history into a hidden state, and then to using attention to link parts of the context to one another directly and in a far more parallelizable way. This journey is what this article traces.

## What Does Predicting the Next Word Mean?

In the simplest case, if the context is "The student went to the ...", the model tries to estimate a probability distribution over the word or token that might follow:

| Candidate | Probability |
|---|---|
| the university | 0.42 |
| the school | 0.23 |
| the house | 0.12 |
| other words | lower probabilities |

A generation algorithm then chooses the next output. Mathematically, the goal is to estimate the probability of the next element given the preceding elements:

`P(x_t | x_1, x_2, ..., x_{t-1})`

By repeating the process element after element, the model can generate a sentence, a paragraph, or a long text.

But there is an essential difference between **the model** and **the generation method**: the model produces a probability distribution, while the decoding strategy decides how we choose from that distribution. This difference explains why the same model can give highly consistent answers with Greedy Search and more varied ones with Sampling.

## Why Do We Say Next Token and Not Next Word?

Traditional N-gram systems may indeed work at the word level, but modern language models usually use smaller units: tokens. An Arabic word may be stored as a single token, or split into several tokens depending on the tokenizer and the vocabulary it was trained on.

This design helps the model deal with rare and new words, different inflections, names, multiple languages, and shared word parts. References on Causal Language Modeling explain that the task in causal generative models is predicting the next token in a sequence of tokens, while preventing the model from seeing future tokens during prediction.

That is why the phrase "predicting the next word" is useful as a simplification, but **Next Token Prediction is the more accurate technical formulation when talking about modern LLMs**.

## From Text to a Prediction of the Next Token

Text passes through six successive stages: it is first split into tokens (tokenization), the tokens are then turned into numerical representations (embeddings), the context is processed, the model produces scores (logits) that Softmax turns into probabilities, and finally the decoding strategy chooses the next token.

![Stages of next-token prediction: splitting "the student went to the" into tokens, then numeric IDs, then embeddings, then context processing in a Transformer, then Logits, Softmax, and a probability distribution led by "the university" at 0.42](/images/articles/body/next-token-prediction-3.avif "From text to a probability distribution: the tokens and numbers are illustrative, and the model does not pick a word but produces a probability for every token; the decoding strategy then decides what gets chosen — Illustration: Techno Enjaz")

### 1. Tokenization: Splitting Text into Tokens

The model does not deal with the raw sentence directly; it starts by splitting it into tokens, which may be whole words, parts of words, common symbols, or characters and smaller units depending on the system. Subword tokenization methods such as BPE and SentencePiece have helped models handle large vocabularies and rare words without having to store every possible word as a separate entry. This stage matters even more in Arabic because of its rich morphological and derivational structure, a point we will return to later.

### 2. Turning Tokens into Numbers

After splitting, each token gets a numeric identifier (Token ID). But a number like `4312` carries no semantic meaning in itself, so it is converted into a numerical vector through an embedding layer.

A common simplification needs correcting here: **two words with similar meanings are not necessarily close to each other automatically in the initial embedding table**. Meaning and context are shaped through training and the model's layers, and the contextual representations inside the network become far richer than a mere initial lookup vector.

### 3. Context Processing

This is where the main generations of models differ: N-grams rely on counts, RNNs on an accumulated hidden state, LSTMs add memory and gates, while the Transformer uses Self-Attention. This difference is the subject of the following sections.

### 4. Producing Logits

In the end, the model produces a score for every possible token in the vocabulary; these scores are called logits, and they are not probabilities yet.

### 5. Turning Scores into Probabilities

The Softmax function converts the scores into a probability distribution whose elements sum to 1.

### 6. Choosing the Token

Once the probabilities are available, the decoding stage begins: we either pick the highest directly, keep several paths, draw a probabilistic sample, or use Top-k, Top-p, and Temperature. Generation does not end at Softmax, and **how we choose from the distribution is a fundamental part of the model's final behavior**.

## N-gram: The Statistical Beginning

### The Idea and a Worked Example

N-grams are among the simplest statistical language models, approximating the probability of the current word from a limited number of preceding words instead of the full history. In a trigram model, the prediction depends on the last two words.

Suppose a small corpus of four sentences: "I love drinking tea," "I love drinking coffee," "I love traveling," and "I love drinking tea in the morning." We want to predict what comes after "I love drinking ...". The context "I love drinking" appeared three times: twice before "tea" and once before "coffee." So:

`P(tea | I love drinking) = 2/3`

and:

`P(coffee | I love drinking) = 1/3`

The model chooses "tea" if we go with the highest probability.

### What Is the Strength of N-grams?

Their strength lies in simplicity, ease of understanding, speed of computation at small scales, no need for neural networks, and the ability to explain the reason behind each probability easily. But they suffer from major problems.

### The Data Sparsity Problem

If a particular sequence never appeared in the training data, raw Maximum-Likelihood estimation may assign zero probability to some events. That is why techniques such as Smoothing and Backoff were historically used to distribute some probability to unobserved events. The problem worsens as N grows, because the number of possible combinations increases very rapidly. In Arabic, the abundance of inflections, affixes, and forms increases the number of surface word forms, which can amplify data sparsity if the system works on whole words.

### Why Can't N-grams Capture Distant Context?

Because a trigram model looks only at the last two words, it may fail to capture a relationship that depends on a word that appeared dozens of words earlier. This limitation is what pushed researchers toward models that represent history more flexibly.

## RNN: Compressing History into a Hidden State

### A Hidden State Instead of a Fixed Window

A Recurrent Neural Network does not rely on a fixed window of words; instead, it passes a hidden state from one step to the next. At each step, the network uses the current token and the previous hidden state to produce a new hidden state; in simplified form:

`h_t = f(W_h h_{t-1} + W_x x_t + b)`

`h_t` carries a compressed representation of everything the network has processed up to that moment. In theory, this lets the entire preceding context influence the prediction, but in practice preserving distant information was difficult.

![RNN diagram before and after unrolling through time, where the hidden state h passes from step to step](/images/articles/body/next-token-prediction-1.avif "Unrolling an RNN through time: at each step x_t enters and the hidden state h_t is updated based on h_{t-1} — Source: fdeloche, Wikimedia Commons, CC BY-SA 4.0")

### The Vanishing Gradient Problem

RNNs are usually trained with Backpropagation Through Time. When the error is propagated across a large number of steps, gradients may become very small, so older words lose their influence on updating the model, a phenomenon known as the Vanishing Gradient. The practical result is that the network may remember nearby context well but struggle to learn distant dependencies, even though its structure allows them in theory.

## LSTM: Longer Memory Through Gates

Long Short-Term Memory appeared in 1997 to address the difficulty of learning long-range dependencies in recurrent networks. It adds a cell state and control mechanisms called gates, the best known being the Forget Gate, the Input Gate, and the Output Gate. These gates help the unit decide what to keep, what can be forgotten, what new information enters, and what passes into the hidden state.

LSTMs thus became more capable than simple RNNs of retaining important information over longer distances. But they did not solve another major problem: **processing is still largely sequential**, so all the positions in a sentence cannot be processed in parallel the way later became possible with Transformers.

## Transformers: Attention Instead of Recurrence

### From Encoder-Decoder to Decoder-Only

In 2017, the paper **Attention Is All You Need** introduced the Transformer architecture, which in its proposed design dropped recurrence and relied on attention. But there is an important detail: **the original Transformer in the paper was an Encoder-Decoder aimed mainly at tasks such as translation.** Generative models in the GPT family use a **Decoder-only Transformer** design or designs derived from it, with causal masking that prevents each position from seeing future tokens during generative training.

![GPT architecture diagram of the Decoder-only Transformer type showing Embedding layers, Transformer blocks, Multi-Head Attention details with a Mask step, then Softmax at the output](/images/articles/body/next-token-prediction-2.avif "GPT architecture (Decoder-only): successive Transformer blocks, each containing Multi-Head Attention with a causal mask, then Linear and Softmax to predict the next token — Source: Marxav and Mrmw, Wikimedia Commons, CC0")

This point matters because the statement "Transformers predict the next word" is true in the context of modern causal models, but it is not an accurate description of every Transformer in existence.

### What Is Self-Attention?

Instead of compressing all of history into a single state as RNNs do, Self-Attention lets each position compute its relationship to the other positions in the context it is allowed to see. The mechanism starts from three representations: the Query (Q), the Key (K), and the Value (V). The basic formula for Scaled Dot-Product Attention is:

`Attention(Q,K,V) = softmax(QKᵀ / √d_k) V`

The simplified idea is that the query represents what the current position is looking for, the keys help measure the importance of other positions, and the values carry the information to be merged; Softmax turns the relationship scores into weights, and the model produces a weighted mix of the information.

### What Distinguishes Causal Attention?

In autoregressive generation, the current token is not allowed to look into the future. If the sequence is "Artificial intelligence helps to ...", then when the model is trained to predict the fourth element, it can see only what precedes it, not the correct answer that appears later in the text. This is enforced with a causal mask, the mechanism that makes training consistent with how the model is used later: predicting the next element from the preceding ones.

### Why Did Transformers Beat RNNs in Large Models?

For reasons that include: the ability to process positions during training with a higher degree of parallelism than RNNs, representing distant relationships directly through attention, scalability to huge models and large datasets, Multi-Head Attention's ability to learn multiple kinds of relationships, and ease of integration with large-scale training techniques. This development paved the way for large autoregressive models such as GPT and others.

## Does the Model "Understand," or Only Compute Probability?

At the level of its core training objective, the model learns to estimate token probabilities. But reducing the behavior of large models to "merely picking the most probable word" is inaccurate for two reasons. First, during training the model builds complex internal representations of context, which can support tasks such as reasoning, summarization, translation, and question answering. Second, the model does not always choose the highest probability; the decoding method may use sampling, and its behavior also depends on the context, post-training, alignment, and the tools in use. The more accurate statement is therefore:

> A generative model produces a probability distribution for the next token based on a learned representation of the context, and the generation strategy then determines how the actual output is chosen.

## The Difference Between Training and Generation

This is one of the most common sources of confusion. **During training**, the system knows the real text and is trained to raise the probability of the correct token. If the sentence is "I visited the city of Damascus in ..." and the real next element is "summer," a loss is computed that measures how far the model's distribution is from the target, and the weights are then updated with optimization algorithms based on Gradient Descent.

**During use**, there is no correct answer known in advance. The model gives a distribution that might assign "summer" 0.28, "Syria" 0.17, "the year" 0.11, "winter" 0.09, and so on, and the decoding strategy then determines what gets selected. After a token is chosen, it is appended to the context, and the process repeats.

## Text Generation Strategies

### Greedy Search

It picks the highest-probability token at each step. Its advantage is that it is simple, consistent, and relatively fast, but it may produce predictable or repetitive text, and it does not guarantee that the best local decision at each step will lead to the best complete sequence.

### Beam Search

It keeps several candidate paths instead of just one. It is often used in specific sequence tasks, but it is not the ideal choice for every form of open-ended writing; neural generation research has shown that increasing the focus on the highest probability alone can produce less natural text in some open-ended generation tasks.

### Temperature

Temperature reshapes the probability distribution before sampling: a lower value makes the distribution sharper and the results more conservative, while a higher value makes it flatter and more varied. Temperature is not literally a "creativity meter," but a parameter that affects the probability distribution, and therefore the likelihood of choosing less probable tokens.

### Top-k

We keep the `k` most probable tokens and then sample from them; if `k=50`, every element outside the top fifty is discarded.

### Top-p, or Nucleus Sampling

Instead of a fixed number, we choose the smallest set of tokens whose probabilities sum to a value such as `p=0.9`, so the size of the candidate set changes with the model's degree of confidence.

![Comparison of Top-k with k=3 and Top-p with p=0.9 on a single probability distribution over eight tokens: the first keeps three tokens, the second keeps five until the cumulative sum reaches 0.90](/images/articles/body/next-token-prediction-4.avif "Top-k keeps a fixed number of candidates, while Top-p keeps the smallest set whose probabilities sum to p, so its size changes with the model's confidence — Illustration: Techno Enjaz")

The paper **The Curious Case of Neural Text Degeneration** proposed this method as a way to cut off the unreliable tail of the distribution while preserving more diversity than strict maximization methods allow in open-ended generation.

## Why Is Arabic a Special Challenge?

The problem is not that Arabic is "hard" in general, but that it has characteristics the system must handle appropriately in its data, tokenization, and evaluation.

### Morphological and Derivational Richness

A single Arabic word may combine a conjunction, a preposition, a definite article, a root, a pattern, and pronouns or suffixes. A word like «وبكتابهم» ("and with their book") carries several linguistic units within a single written form.

![Morphological segmentation of the word "wa-bi-kitābihim" into the conjunction waw, the preposition ba, the noun "book", and the pronoun "them", with a comparison of three ways to tokenize it: one token for the whole word, a hypothetical statistical split, and a morphology-aware split](/images/articles/body/next-token-prediction-5.avif "A single Arabic word may carry a conjunction, a preposition, a noun, and a pronoun; and how it is split into tokens affects vocabulary size and root sharing across words (the statistical split here is a hypothetical example) — Illustration: Techno Enjaz")

Treating every surface form as an independent unit may therefore produce a huge vocabulary and higher data sparsity, and Arabic NLP research has stressed for many years that tokenization and morphological processing are central to processing Arabic.

### Non-Concatenative Morphology

Arabic is not limited to prefixes and suffixes; an important part of its morphology rests on the **root and pattern**, meaning changes can occur within the structure of the word itself. This poses a challenge for tokenization algorithms that rely mainly on statistically merging or splitting adjacent segments, and 2025 research on languages with non-concatenative morphology showed that traditional subword algorithms may not always represent root-and-pattern structure naturally.

### The Absence of Diacritics in Most Texts

Ordinary Arabic text is usually written without short vowel marks, so a single written form may admit more than one reading or meaning, and context is what helps the model narrow down the possibilities.

### Diglossia and Dialects

The Arab world uses Modern Standard Arabic, multiple local dialects, intermediate registers between them, and code-switching between Arabic and English, French, and other languages. Recent studies on code-switched Arabic indicate that the Arabic linguistic environment is multi-layered in a way that makes building models, data, and evaluation more complex than treating "Arabic" as a single homogeneous block.

### Variation in Informal Writing

On social networks in particular, we find spelling variations, elongated letters, Arabizi, foreign words, dialects with no fixed spelling standard, and code-switching within the same sentence, all factors that make tokenization, normalization, and prediction harder.

## Is a "Morphological" Tokenizer Enough to Solve Arabic?

**No**, and this point became clearer in 2025 and 2026 research. Earlier studies showed that adding morphological information to tokenization can improve Arabic representations and some tasks, and the MorphBPE paper at ACL 2026 presented results indicating that morphology-aware tokenization can improve morphological consistency and lower Language Model Cross-Entropy, with improvements in Arabic reading comprehension within its experimental setup.

But another study at LREC 2026 examined the representation of root and pattern in seven Arabic and multilingual models and tokenizers, and found that **a tokenizer's alignment with morphological structure is neither a necessary nor, on its own, a sufficient condition for a model's ability to generate morphological forms well**. The moral:

> Arabic quality is not determined by the tokenizer alone; data, model size, training architecture, dialect distribution, evaluation quality, and post-training all intertwine with it.

## How Have Modern Arabic Models Evolved?

### Jais

Jais appeared in 2023 as a family of generative models centered on Arabic and English, with a base model and a chat version. The base version published in the paper had 13 billion parameters and used a Decoder-only architecture derived from GPT-3, trained on a mix of Arabic, English, and code, and the family later expanded to different sizes and context lengths.

### Jais 2

In December 2025, Inception, Cerebras, and MBZUAI announced Jais 2, a newer generation of open-weight Arabic models that the published materials describe as designed from the ground up for strong performance in Modern Standard Arabic and dialects, with greater attention to cultural and linguistic diversity. In 2026, a detailed technical paper on the Jais 2 family appeared, including versions of up to 70 billion parameters, with an Arabic-specific vocabulary and comparisons on Arabic and cultural benchmarks.

### ALLaM

ALLaM is a family of language models focused on Arabic and English. Its technical paper, published in 2024, explains that it uses an autoregressive Decoder-only architecture and addresses vocabulary expansion, training on an Arabic-English mix, and knowledge transfer between the two languages, along with subsequent alignment with human preferences.

What matters here is not ranking Jais and ALLaM to declare one "the best model," but that they are examples of Arabic NLP moving from merely using multilingual models to **designing and training models centered on Arabic itself**.

## Comparing N-gram, RNN, LSTM, and Transformer

| Model | Context Representation | Key Advantage | Key Limitation |
|---|---|---|---|
| N-gram | The last N−1 elements | Simple and interpretable | Data sparsity and limited context |
| RNN | Accumulated hidden state | Longer context than N-grams | Difficulty with distant dependencies and sequential processing |
| LSTM | Hidden State + Cell State + Gates | Better memory for long-range relationships | Still relatively sequential |
| Transformer | Self-Attention | Direct relationships, better parallelism, and scalability | Standard attention cost rises with context length |
| Decoder-only LLM | Causal Self-Attention + large-scale training | Broadly capable text generation | Training/serving cost, data quality, hallucination, context limits |

## Is Next-Token Prediction Enough to Build an Advanced Language Model?

Training on Next Token Prediction is a vitally important foundation for autoregressive generative models, but it is not the whole story. Modern models may also go through stages such as pretraining, instruction tuning, supervised fine-tuning, preference optimization or other alignment methods, tool-use training, safety tuning, and domain adaptation.

So the model the end user interacts with is usually not just a network whose training ended at predicting the next token on raw text. Even so, the next-element prediction task remains **the core computational engine of step-by-step generation** in a large number of modern language models.

Applications can also narrow how they use that engine: in our [digital student guide app](/projects/student-university-guide-app), Gemini is used only to understand a question's intent and match it to a controlled FAQ base, not to generate open-ended answers.

## Common Misconceptions About Next-Word Prediction

| The Common Claim | The Correction |
|---|---|
| "The model looks for the most frequently used word" | Not necessarily; a simple N-gram relies heavily on frequency, but a modern Transformer produces probabilities from a complex representation of context learned in training |
| "Every token is a word" | Wrong; a token may be part of a word, a symbol, or another unit |
| "A Transformer sees the whole future sentence when generating" | In causal language models it does not see the future, because the causal mask prevents it |
| "The highest probability always gives the best text" | Not necessarily; greedy decoding may differ greatly from sampling, and research has shown that maximizing probability alone is not always the best strategy for open-ended generation |
| "A morphological tokenizer = an excellent Arabic model" | Not enough; tokenization matters, but model quality depends on a whole system including data, training, architecture, and evaluation |
| "Modern models predict one word and then stop" | No; the chosen token is appended to the context and the process repeats until the model reaches a stopping condition or the generation limit |

## What Is the Future of Text Prediction in Arabic?

The direction of progress does not seem confined to increasing parameter counts. Several fronts are advancing together: more efficient Arabic tokenization, better representation of morphology, roots, and patterns, higher-quality dialect data, handling code-switching, open-weight Arabic models, longer and more efficient context, more efficient attention techniques, better Arabic and cultural evaluations, reducing hallucination and improving grounding, integrating tools and external retrieval (such as using [the MCP protocol standard](#article/model-context-protocol-mcp)), and smaller, more efficient models for local use and edge devices.

Recent research on Morphology-Aware Tokenization confirms that the question is not yet settled; there is clear progress, but the relationship between the shape of tokens and actual linguistic ability is more complex than any single simple rule can capture.

## Conclusion

Next-word prediction began as a relatively simple statistical problem: counting what usually comes after a short context. With N-grams, context was a limited window; with RNNs, history came to be compressed into a hidden state; then LSTMs made retaining distant information more stable. Transformers took the idea to a different level with attention and scalable contextual processing, and Decoder-only Transformers became the foundation of a large number of modern generative language models.

But the more accurate term today is usually **Next Token Prediction**, because the model does not necessarily work with whole words. And for Arabic, the problem does not end with translating an English model or adding Arabic words to the vocabulary; morphology, dialects, diacritics, informal writing, code-switching, and the tokenization method all affect a model's effectiveness.

That is why understanding "How does the model choose the next element?" is not just an explanation of a small algorithm, but a gateway to understanding how modern language models generate text step by step.

## Sources and References

1. Vaswani et al. (2017), Attention Is All You Need — https://arxiv.org/abs/1706.03762
2. Hochreiter & Schmidhuber (1997), Long Short-Term Memory — https://doi.org/10.1162/neco.1997.9.8.1735
3. Hugging Face, Causal Language Modeling — https://huggingface.co/docs/transformers/tasks/language_modeling
4. Sennrich, Haddow & Birch (2016), Neural Machine Translation of Rare Words with Subword Units — https://aclanthology.org/P16-1162/
5. Kudo & Richardson (2018), SentencePiece — https://arxiv.org/abs/1808.06226
6. Holtzman et al. (2020), The Curious Case of Neural Text Degeneration — https://arxiv.org/abs/1904.09751
7. Habash & Rambow (2005), Arabic Tokenization, POS Tagging and Morphological Disambiguation — https://aclanthology.org/P05-1071/
8. Alkaoud & Syed (2020), On the Importance of Tokenization in Arabic Embedding Models — https://aclanthology.org/2020.wanlp-1.11/
9. Gazit et al. (2025), Splintering Nonconcatenative Languages for Better Tokenization — https://aclanthology.org/2025.findings-acl.1151/
10. Asgari et al. (2026), MorphBPE: Morphology-Aware Tokenization for Efficient LLM Training — https://aclanthology.org/2026.findings-acl.2068/
11. Alakeel et al. (2026), Morphemes without Borders — https://aclanthology.org/2026.lrec-1.923/
12. Hamed et al. (2025), A Survey of Code-switched Arabic NLP — https://aclanthology.org/2025.coling-main.307/
13. Sengupta et al. (2023), Jais and Jais-chat — https://arxiv.org/abs/2308.16149
14. MBZUAI (2025), Release of Jais 2 — https://mbzuai.ac.ae/news-events/news/inception-cerebras-mbzuai-release-jais-2-the-next-generation-the-worlds-leading
15. Anwar et al. (2026), Jais 2 — https://arxiv.org/abs/2608.13580
16. Bari et al. (2024), ALLaM — https://arxiv.org/abs/2407.15390
