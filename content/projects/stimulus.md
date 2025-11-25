---
layout: page
title: "stimulus"
description: "A data-centric deep learning framework for biology"
---


## Why Stimulus?

The challenge on building meaningful biological models remain on the data. How to process it, clean it, transform it in meaningful ways. Yet, most ML frameworks focus almost entirely on the modeling stage. They provide training loops, architectures, metrics, and utilities — but leave the data-processing side to ad-hoc scripts, manual pipelines, and scattered notebooks. Without a smooth link from data to model, insights remain trapped. We created stimulus to address that. 

## Our solution

We provide an end-to-end framework that connects data procedures (cleaning, transformation, augmentation, bioinformatics processing, etc.), with hyperparameter optimization, training, and evaluation - all in one place. The main functionalities are implemented as a [Python toolkit](https://github.com/mathysgrapotte/stimulus-py), while a modular [workflow](https://github.com/nf-core/deepmodeloptim) implemented in [Nextflow](https://www.nextflow.io/) goes with it to enable systematic exploration at scale.

<img src="/images/projects/stimulus.png" alt="Stimulus" width="700px">


<br />

<div style="text-align: right;">
    <blockquote style="border-left: none;">
        <h2><i>Data first, model follows.</i></h2>
    </blockquote>
</div>
