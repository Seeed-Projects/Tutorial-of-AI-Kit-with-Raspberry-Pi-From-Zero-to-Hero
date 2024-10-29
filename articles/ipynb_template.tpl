{% extends 'markdown/index.md.j2' %}

{% block markdowncell %}
{% for line in cell.source.splitlines() %}
{% if line.startswith('# ') %}
##{{ line[1:] }}
{% elif line.startswith('## ') %}
###{{ line[2:] }}
{% elif line.startswith('### ') %}
####{{ line[3:] }}
{% elif line.startswith('#### ') %}
#####{{ line[4:] }}
{% elif line.startswith('##### ') %}
######{{ line[5:] }}
{% elif line.startswith('###### ') %}
{{ line[6:] }}
{% else %}
{{ line }}
{% endif %}
{% endfor %}
{% endblock markdowncell %}

{% block output %}
{% if output.output_type == "stream" %}
```
{{ output.text }}
```

{% elif output.output_type == "execute_result" or output.output_type == "display_data" %}

```
{{ output.data['text/plain'] if 'text/plain' in output.data else '' }}
```

{% endif %} {% endblock output %}
