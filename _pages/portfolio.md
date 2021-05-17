---
title: Portfolio | Simple Jekyll
header: About my projects
description: Here are things I've made.
permalink: /portfolio/
layout: default
---

## Things I've made

{% for project in site.projects %}
  <p>{{ project.title }}<br/>
    {{ project.description }}<br/>
    </p>
{% endfor %}
