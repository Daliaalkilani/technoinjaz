<!--
FILE: 02-article.md
PURPOSE: Published article content
VERIFICATION DATE: 2026-09-21
-->

SEO Title: How Does AI Image Classification Work? From CNN to Vision Transformers

Meta Description: A practical guide to understanding AI image classification: data preparation, CNN, ResNet, and Vision Transformers, Transfer Learning, the right metrics, CLIP and DINOv2, applications and challenges.

Suggested Slug: ai-image-classification

# How Does AI Image Classification Work? From CNN to Vision Transformers

**Image Classification is a computer vision task that aims to assign one or more categories to an entire image based on its visual content.**  
A model might take an image as input and output, for example:

```text
cat: 0.91
dog: 0.07
other: 0.02
```

But building a reliable classification system does not start with merely picking a neural network.

The real path is closer to:

```flow
Data
→
Cleaning & Labeling
→
Train / Validation / Test Split
→
Preprocessing & Augmentation
→
Model / Pretrained Backbone
→
Training or Fine-tuning
→
Evaluation
→
Calibration & Error Analysis
→
Deployment
→
Monitoring
```

And the most important point:

> **The model does not "understand" the image the way a human does; it learns numerical representations that help it link visual patterns to specific categories.**

# What Is the Difference Between Image Classification, Object Detection, and Segmentation?

These tasks are often confused.

## Image Classification

The question:

> What is in the image?

Example:

```text
Image → "cat"
```

The output is a category for the whole image.

## Object Detection

The question:

> What objects are present, and where are they?

The output:

- A category.
- A Bounding Box.
- A confidence score.

Example:

```text
Person → box
Car → box
Traffic light → box
```

![A desk with a laptop, bottles, a cup, a bowl, and a chair, with a colored bounding box around each object labeled with its class as detected by a YOLOv3 model](/images/articles/body/ai-image-classification-4.avif "Object Detection with YOLOv3: the output is not a single category for the image, but a category plus a Bounding Box for each object such as laptop, bottle, cup, and chair — Source: MTheiler, Wikimedia Commons, CC BY-SA 4.0")

## Image Segmentation

The question:

> Which Pixels belong to which object or region?

The output is a pixel-level Mask.

## Face Recognition

Not just generic Image Classification.

The question there is usually:

> Does this face belong to a specific identity?

It relies on identity representations and matching, with different privacy and security implications.

So the success of an Image Classifier should not be taken as automatic proof that an Object Detector or Face Recognition system will succeed.

# How Does a Computer See an Image?

A digital image is a matrix of values.

An RGB image can be approximated as:

```text
Height × Width × 3 channels
```

Each Pixel contains values representing the intensity of:

- Red.
- Green.
- Blue.

Before deep learning, the engineer tried to convert these raw values into hand-designed Features.

Today, deep models learn a large part of the representation directly from the data.

# How Did Image Classification Work Before Deep Learning?

The classical pipeline was usually:

```flow
Image
→
Hand-crafted Feature Extraction
→
Feature Vector
→
Classifier
```

Among the best-known Feature descriptors:

- HOG.
- SIFT.
- LBP.
- Gabor features.

Then a classifier such as:

- SVM.
- Logistic Regression.
- KNN.
- Random Forest.

## Example: HOG + SVM

HOG summarizes Gradient orientations and edges.

It then turns the image into a Feature Vector.

After that, an SVM learns a boundary separating the classes.

This methodology is still useful in some projects when:

- Data is scarce.
- The problem is relatively simple.
- Compute is limited.
- The Features are well understood.
- We need a small, fast model.

But it depends more heavily on manual Feature engineering.

# What Did CNNs Change?

**Convolutional Neural Networks — CNNs** made it possible to learn Features during training itself.

Instead of:

```text
Human-designed features → classifier
```

we now have:

```text
Image → learned features → classifier
```

## The Convolutional Layer

It applies Kernels/Filters to local regions of the image.

In early layers, responses may appear for patterns such as:

- Edges.
- Orientations.
- Contrasts.
- Textures.

As depth increases, the representations become more tied to object structure.

![Diagram of a typical convolutional neural network: an input image followed by convolution and pooling layers and a fully connected layer producing outputs](/images/articles/body/ai-image-classification-1.avif "Typical CNN structure: convolution layers produce feature maps, followed by downsampling and a classification layer — Source: Aphex34, Wikimedia Commons, CC BY-SA 4.0")

But beware the oversimplified sentence:

> "The first layer recognizes edges, the second eyes, the third faces."

It can be pedagogically useful, but it is not a fixed rule for every network and every Dataset.

# What Is the Role of Pooling?

Pooling reduces the spatial dimensions of some Feature Maps.

For example:

- Max Pooling.
- Average Pooling.

![A numerical example of Max Pooling with a 2×2 window converting a 6×6 matrix into 3×3 by taking the maximum value from each window](/images/articles/body/ai-image-classification-2.avif "An example of Max Pooling with a 2×2 window: the largest value in each window is taken, shrinking the map from 6×6 to 3×3 — Source: Daniel Voigt Godoy, Wikimedia Commons, CC BY 4.0")

It may help with:

- Reducing the amount of computation.
- Indirectly increasing the Receptive Field.
- Making some representations less sensitive to small local variations.

But not all modern networks rely on traditional Pooling in the same way; some use Strided Convolutions or other architectures.

# Does Every CNN End in Fully Connected Layers?

No.

This description is correct for many traditional architectures, but it is not a universal rule.

Modern models use, for example:

- Global Average Pooling.
- A linear classification head.
- Attention heads.

The important concept is the presence of a **Classifier Head** that converts a Representation into Scores for the classes — not the necessity of multiple Fully Connected layers.

# What Is ResNet and Why Was It Important?

As networks grew deeper, a problem emerged: deeper networks do not automatically become easier to train.

ResNet introduced the idea of **Residual Connections**:

```text
output = F(x) + x
```

instead of each layer learning a full Transform from scratch.

This design helped train very deep networks.

In the original ResNet paper, an **Ensemble** of residual networks achieved a 3.57% error rate in the ImageNet 2015 competition.

This point requires precision:

> The 3.57% figure does not mean that any single ResNet achieved "96.43% Accuracy" on every kind of image, nor that AI became better than humans at vision in general.

It is the result of a specific Benchmark, within a specific Metric, architecture, and experiment.

# What Came After CNNs?

CNNs are still very powerful, but modern image classification is no longer built on them alone.

One of the most significant shifts was the **Vision Transformer — ViT**.

# How Does a Vision Transformer Work?

The original ViT idea is conceptually simple:

1. Split the image into Patches.
2. Convert each Patch into a Vector.
3. Treat the Patches as a sequence of Tokens.
4. Pass them through a Transformer.
5. Use the final Representation for classification.

For example:

```flow
Image
→
16×16 patches
→
Patch embeddings
→
Transformer
→
Classifier
```

The ViT paper showed that a pure Transformer can achieve very strong performance in Image Classification when Pre-trained on large data and then transferred to other Benchmarks.

This widened the field from:

> The CNN is the only natural architecture for vision

to:

> CNNs, Transformers, and others can all learn effective Visual Representations.

![A Vision Transformer diagram: splitting the image into patches, embedding them with positional encoding, then passing them through attention layers to the classification head](/images/articles/body/ai-image-classification-3.avif "Vision Transformer structure: the image is split into patches treated as a sequence of Tokens, then classified by the cls token — Source: Aston Zhang et al. (Dive into Deep Learning), Wikimedia Commons, CC BY-SA 4.0")

# Is the Vision Transformer Always Better Than a CNN?

No.

The choice depends on:

- Data size.
- Pretraining.
- Resources.
- Latency.
- The target device.
- The required accuracy.
- Model size.

A small CNN may be excellent for an Edge application.

A ViT or Foundation Model may be better when we have strong Pretraining or need a broader Representation.

There is no "best Architecture" independent of the Use Case.

# What Is the Difference Between Closed-set and Open-vocabulary Classification?

Traditional classification is mostly **Closed-set**.

That is, the categories are known during training:

```text
cat
dog
horse
car
```

The Classifier head learns only these categories.

Modern image-text models such as **CLIP** changed the way of thinking.

# How Does CLIP Work for Classification?

CLIP learns to link:

- Images.
- And text.

inside a shared Representation space.

Instead of a fixed Head only, an image can be compared with Text prompts such as:

```text
"a photo of a cat"
"a photo of a dog"
"a photo of a bicycle"
```

and then choosing the text closest to the image.

This enabled what is called **Zero-shot classification** across multiple Benchmarks without direct Supervised training on each Dataset.

But this does not mean Zero-shot is automatically suitable for every sensitive application.

Performance depends on:

- The categories.
- The Prompt.
- The Domain.
- The data distribution.
- The biases present in Pretraining.

# What Is DINOv2 and Why Does It Matter?

DINOv2 is an example of **Self-supervised visual pretraining**.

The idea is to learn general Visual Features from many images without relying on traditional Labels for each image.

The Representation can then be used for different tasks, including:

- Image Classification.
- Retrieval.
- Dense prediction.
- Transfer.

This reflects an important trend in computer vision:

> Instead of training a separate Model from scratch for every project, we increasingly start from a Visual Foundation Model and then adapt it to the task.

# How Do You Build an Image Classification Pipeline?

## 1. Define the Task Precisely

What do you want:

### Single-label Classification?

One category per image:

```text
cat OR dog
```

### Multi-label Classification?

More than one Label for the image:

```text
person
bicycle
helmet
```

The difference matters because:

- The Loss differs.
- The Output activation differs.
- The Metrics differ.

# 2. Collect the Data

The number of images alone is not enough.

Ask:

- Do the images represent the real operating environment?
- Are there different camera devices?
- Different lighting?
- Different ages/categories?
- Rare cases?
- Varied backgrounds?
- Are the Labels correct?

100,000 biased images may be worse than a smaller Dataset that actually represents the problem.

# 3. Separate Train, Validation, and Test

## Train

For updating the weights.

## Validation

For choosing:

- Hyperparameters.
- Checkpoint.
- Threshold.
- Model.

## Test

For final evaluation.

One of the most dangerous mistakes is **Data Leakage**.

For example, in Medical Imaging:

If multiple images of the same patient are spread between Train and Test, performance can appear higher than it actually is.

The right Split may need to be at the level of:

- Patient.
- Device.
- Site.
- Time period.

depending on the task.

# 4. Preprocessing

It may include:

- Resize.
- Crop.
- Normalization.
- Color conversion.
- Artifact removal.

But there is no single "correct" Normalization for everyone.

If you use a Pretrained model, the Preprocessing it was trained with must usually be respected.

# 5. Data Augmentation

It can include:

- Random crop.
- Rotation.
- Flip.
- Color jitter.
- Blur.
- Random erasing.
- MixUp/CutMix in some projects.

Its goal is not just "increasing the number of images," but exposing the model to plausible variations it may encounter at runtime.

## When Is Augmentation Risky?

When it changes the meaning of the Label.

Example:

Flipping a medical X-ray or organ image horizontally may change Laterality.

Or a large Rotation may be unrealistic for documents and specific orientations.

So:

> Augmentation must preserve the meaning of the category; it should not be random just to multiply the data.

# 6. Choose a Baseline

Start with something simple.

Such as:

- Logistic Regression on Features.
- SVM.
- Pretrained ResNet18.
- A MobileNet/EfficientNet-class model.
- A small ViT.

The goal is to know whether the added complexity brings value.

# 7. Transfer Learning or Training from Scratch?

In many projects, Transfer Learning is the practical choice.

Two common approaches exist:

## Fixed Feature Extractor

Freeze most of the Backbone and train the Classification head.

## Fine-tuning

Starting from Pretrained weights, then updating some or all of the model's layers.

So Transfer Learning does not always mean:

> "We freeze the first layers and train only the last layer."

That is one method.

Full Fine-tuning may be better when:

- We have enough data.
- The Domain is different.
- We use a suitable Learning Rate.

# 8. What Does the Model Output?

In a Multi-class classifier, it usually produces **Logits**.

Such as:

```text
[4.2, 1.1, -0.4]
```

Then Softmax converts them into values summing to 1:

```text
[0.94, 0.043, 0.017]
```

But it is important to note:

> **A Softmax score is not necessarily a well-calibrated Probability.**

The model may be Overconfident.

So in high-stakes applications we may need **Calibration** instead of interpreting 0.94 as genuine 94% confidence.

# How Do We Measure an Image Classifier's Performance?

## Accuracy

```text
correct predictions / all predictions
```

Suitable when the categories are relatively balanced and error costs are similar.

But it can be misleading.

Example:

A Dataset containing:

- 990 healthy images.
- 10 diseased images.

A model that says "healthy" for every image:

```text
Accuracy = 99%
```

Yet:

```text
Recall for the diseased cases = 0%
```

The system fails the medical objective.

# Precision

It answers:

> Of everything the model predicted as positive, how much was correct?

```text
Precision = TP / (TP + FP)
```

# Recall

It answers:

> Of all the true positive cases, how many did the model detect?

```text
Recall = TP / (TP + FN)
```

# F1 Score

The harmonic mean of Precision and Recall:

```text
F1 = 2 × Precision × Recall / (Precision + Recall)
```

Useful when we need a balance between the two.

# Macro or Weighted F1?

In Multiclass classification:

## Macro F1

You compute the F1 for each Class and then give it equal weight.

Useful when rare categories matter.

## Weighted F1

It weights each category by its number of Samples.

It can hide poor performance on a small class.

# Confusion Matrix

One of the most valuable tools because it reveals **which class the model confuses with which class**.

We might see, for example:

```text
wolf → dog
truck → bus
melanoma → benign lesion
```

This information is more important than a single Accuracy figure.

![An illustrative confusion matrix for three classes — dog, wolf, and cat — showing 18 wolves classified as dogs despite 88% overall accuracy](/images/articles/body/ai-image-classification-5.avif "Confusion Matrix: rows are the true class and columns are the model's prediction; the wolf → dog confusion drops the wolf class Recall to 62% while overall Accuracy looks good (illustrative figures) — illustration: Techno Enjaz")

# What About ROC-AUC and PR-AUC?

They can be especially useful in Binary Classification.

But the choice of Metric should depend on:

- Class imbalance.
- The cost of a False Positive.
- The cost of a False Negative.
- Threshold.
- The application.

In a highly imbalanced Dataset, the Precision-Recall curve may be more informative than Accuracy alone.

# Don't Just Test the Dataset; Test the Real World

Success on a Test split is not enough.

There is the problem of **Distribution Shift**.

The model may train on:

- Professional cameras.

then operate on:

- A cheap phone.

Or train on:

- One hospital.

then be used in:

- Another hospital.

Or train on:

- Good lighting.

then work at night.

You must test:

- Different devices.
- Different Locations.
- Different times.
- Blur.
- Lighting.
- Compression.
- Occlusion.
- Important Subgroups.

# What Is the Difference Between Confidence and Uncertainty?

The model may output:

```text
dog = 0.99
```

but the image may be outside the training Distribution.

Such as:

- An X-ray image for a model trained on animals.
- A strange cartoon drawing.
- A disease type it has never seen.

Good systems therefore sometimes need:

- Out-of-distribution detection.
- Abstention.
- Human review.
- A Confidence threshold.
- Calibration.

The best decision may be:

> "I don't know well enough"

rather than a wrong Class with high confidence.

# Is Deep Learning Always Better Than Classic ML?

No.

The academic literature compares them sharply, but reality depends much more on the task.

## Classic ML may be better when:

- The Dataset is very small.
- The Features are understood and strong.
- Resources are limited.
- The model needs simplicity.
- Latency must be extremely low.
- We need relatively direct interpretability.

## Deep Learning is often better when:

- The data is visually complex.
- We have Pretrained models.
- We need to learn Features.
- Visual variations are numerous.
- The Scale is large.

And most importantly, Transfer Learning has greatly narrowed the gap in data requirements.

# Does Deep Learning Always Need Millions of Images?

No.

That was truer when thinking about Training from scratch.

Today you can start from:

- A Pretrained ResNet.
- A Pretrained ViT.
- A Self-supervised model.
- An Image-text model.

then Fine-tune on a smaller Dataset.

Of course, "smaller" does not mean any number of images will do.

Quality, representativeness, and similarity to the original Domain still matter.

# What Are the Main Applications of Image Classification?

## Medical Imaging

Models may be used to assist with:

- Mammography.
- Retinal images.
- Skin lesions.
- Pathology.
- X-ray.
- MRI.
- CT.

But a distinction must be made between:

> Research performance

and:

> Clinical deployment.

A 2020 Nature study on breast cancer screening showed, on the study's Dataset, an absolute reduction in False Positives of **5.7% in the United States and 1.2% in the United Kingdom**, and a reduction in False Negatives of **9.4% and 2.7%**, respectively.

These are results of a specific study, not a declaration that "AI is more accurate than doctors in every diagnosis."

An Addendum was also later published to add detail on the reproducibility of the method.

So any medical system needs:

- External validation.
- Clinical validation.
- Regulatory review where appropriate.
- Monitoring.
- Human oversight.

# Vehicles and Autonomous Driving

Computer vision matters for vehicles, but **Image Classification alone is not enough**.

A vehicle usually needs:

- Object Detection.
- Segmentation.
- Tracking.
- Depth.
- Sensor fusion.
- Planning.
- Control.

Also, the common phrase:

> "94% of accidents are caused by human error"

must be used with caution.

NHTSA documents clarify that the "Critical Reason" is the last failure in the chain before the crash, **and is neither the cause of the crash nor an assignment of fault**.

So a figure like this must not be turned into a claim that automated vision systems will automatically prevent 94% of accidents.

# Manufacturing

Classification can be used for:

- Defect classification.
- Product quality.
- Sorting.
- Part type.
- Surface conditions.

Example:

```flow
Image
→
Classifier
→
OK / scratch / crack / contamination
```

But if we need to localize the defect, Detection or Segmentation may be more suitable.

# Agriculture

Such as:

- Plant disease classification.
- Crop types.
- Fruit ripeness.
- Product quality.

And the model must be tested on:

- Different cameras.
- Sunlight.
- Different environments.
- Different plant varieties.

# Security and Surveillance

Classification can be used for:

- Scene classification.
- Content.
- Visual events.

**Face Recognition**, on the other hand, is a different and sensitive task.

It must be evaluated for:

- False matches.
- Demographic performance.
- Consent/legal basis.
- Retention.
- Security.

A model with high Accuracy on a public Dataset should not be considered evidence of its suitability for high-stakes identity use.

# What Are the Challenges of Image Classification?

## 1. Label Quality

If the Labels are wrong, the model learns noise.

## 2. Class Imbalance

It may ignore rare categories.

## 3. Shortcut Learning

The model may learn an unintended signal.

Example:

Instead of learning the disease, it may learn:

- A device watermark.
- A background.
- A Marker on the X-ray.

then collapse outside the Dataset.

## 4. Domain Shift

A change of camera, location, or population can reduce performance.

## 5. Spurious Correlations

The Label may be correlated with a side factor only in the training data.

## 6. Adversarial Examples

Research has shown that specially designed Perturbations can make models classify incorrectly with high confidence.

But adversarial attacks are not just "invisible noise"; there are also:

- Physical adversarial patterns.
- Patch attacks.
- Data poisoning.

And the defense is not a fully solved problem.

# Does Adversarial Training Solve the Problem?

It can increase Robustness against particular families of attacks.

But it may:

- Increase the training cost.
- Affect Clean accuracy.
- Not generalize to every Threat model.

So before choosing a defense, you must define:

> Who is the attacker? What is their capability? And what are we trying to protect?

# How Do We Understand the Model's Decision?

Tools such as **Grad-CAM** can produce an approximate Heatmap of the regions that contributed to a Prediction within some CNN-based architectures.

This is useful for:

- Debugging.
- Detecting Shortcut learning.
- Reviewing what the model is looking at.

But:

> A Heatmap is not a complete causal explanation, nor proof that the model "thought" the way a human does.

Explainability tools must themselves be evaluated.

# How Do You Deploy the Model on the Edge?

We may need to run Classification on:

- A phone.
- A camera.
- A Raspberry Pi-class device.
- An Embedded accelerator.

We can use:

## Quantization

Reducing the numerical Precision, such as:

```text
FP32 → INT8
```

## Pruning

Removing some of the less important weights/structures according to a specific method.

## Knowledge Distillation

Training a smaller Student model to benefit from a larger Teacher.

## Smaller Backbone

Sometimes the best optimization is choosing a smaller model from the start.

You must measure:

- Accuracy.
- Latency.
- RAM.
- Model size.
- Power.
- Throughput.

and not FLOPs only.

# How Are Foundation Models Changing the Future of Classification?

There is a shift from:

> A Model trained for fixed categories only

to:

> A general Visual representation that can be adapted to many tasks.

Examples:

## CLIP

Links Image ↔ Text and enables Zero-shot classification in many cases.

## DINOv2

Learns general Visual Features in a Self-supervised manner.

## ViT-based pretrained models

Can be Fine-tuned or used for their Features.

These models reduce the need for Training from scratch, but they do not eliminate the need for:

- Local Validation.
- Bias testing.
- Data governance.
- Domain testing.

# How Do You Choose an Approach in Practice?

Use this simplified decision guide:

## Small Dataset + Clear Task

Start with:

- A Pretrained CNN or ViT.
- Transfer Learning.

## Small Edge Device

Test:

- A Mobile-oriented CNN.
- A Small ViT.
- A Quantized model.

## Constantly Changing Categories

Think about:

- Image-text models.
- Embedding-based classification.
- A Retrieval-assisted approach.

## A Sensitive Medical/Industrial Domain

Focus on:

- Dataset quality.
- External validation.
- Calibration.
- Error analysis.
- Human review.
- Monitoring.

## Not Enough Labels

Think about:

- Self-supervised pretraining.
- Transfer Learning.
- Active Learning.
- Weak supervision.
- Vision-language models.

# Checklist Before Launching an Image Classifier

- [ ] The task is truly Classification, not Detection/Segmentation.
- [ ] Classes are clearly defined.
- [ ] Labels reviewed by specialists where needed.
- [ ] Train/Val/Test separated without Leakage.
- [ ] The Test set represents the real world.
- [ ] A Baseline exists.
- [ ] Class imbalance handled appropriately.
- [ ] Metrics chosen according to the cost of error.
- [ ] Confusion Matrix reviewed.
- [ ] Subgroup evaluation available where needed.
- [ ] Model calibrated if the Scores will be used as probabilities.
- [ ] OOD behavior known.
- [ ] Human fallback in place for critical decisions.
- [ ] Latency/Power/Memory tested on the real device.
- [ ] Post-deployment Monitoring in place.
- [ ] A retraining/versioning plan exists.

# Conclusion

Image classification no longer means just:

```text
Image → CNN → Label
```

The modern system is closer to:

```flow
Representative Data
→
Preprocessing / Augmentation
→
Pretrained Visual Representation
→
CNN / ViT / Foundation Model
→
Fine-tuning
→
Probability Scores
→
Calibration + Metrics + Error Analysis
→
Deployment
→
Monitoring
```

The historical evolution can be summarized as:

```flow
Hand-crafted Features
→
SIFT / HOG + SVM
→
CNN
→
ResNet
→
Vision Transformer
→
Self-supervised & Vision-Language Foundation Models
```

But the newest model is not automatically the best.

The best system is the one that:

- Solves the right task.
- Trains on representative data.
- Is measured with metrics suited to the risks.
- Knows when not to trust its prediction.
- Operates within resource limits.
- And proves its performance on the environment where it will actually be used.

## Sources and References

1. K. He et al. — Deep Residual Learning for Image Recognition  
   https://arxiv.org/abs/1512.03385

2. A. Dosovitskiy et al. — An Image is Worth 16×16 Words: Transformers for Image Recognition at Scale  
   https://arxiv.org/abs/2010.11929

3. OpenAI — CLIP: Connecting Text and Images  
   https://openai.com/index/clip/

4. M. Oquab et al. — DINOv2: Learning Robust Visual Features without Supervision  
   https://arxiv.org/abs/2304.07193

5. PyTorch — Transfer Learning for Computer Vision Tutorial  
   https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial

6. scikit-learn — Metrics and scoring: quantifying the quality of predictions  
   https://scikit-learn.org/stable/modules/model_evaluation.html

7. S. M. McKinney et al. — International evaluation of an AI system for breast cancer screening  
   https://www.nature.com/articles/s41586-019-1799-6

8. McKinney et al. — Addendum: International evaluation of an AI system for breast cancer screening  
   https://www.nature.com/articles/s41586-020-2679-9

9. R. R. Selvaraju et al. — Grad-CAM  
   https://arxiv.org/abs/1610.02391

10. I. Goodfellow, J. Shlens, C. Szegedy — Explaining and Harnessing Adversarial Examples  
    https://arxiv.org/abs/1412.6572

11. NHTSA — Critical reason is not the cause of a crash / crash causation guidance  
    https://www.nhtsa.gov/sites/nhtsa.dot.gov/files/812023-heavy_truck_pre-crash_scenarios.pdf

12. O. Russakovsky et al. — ImageNet Large Scale Visual Recognition Challenge  
    https://arxiv.org/abs/1409.0575

13. C. Shorten, T. M. Khoshgoftaar — A survey on Image Data Augmentation for Deep Learning  
    https://journalofbigdata.springeropen.com/articles/10.1186/s40537-019-0197-0
