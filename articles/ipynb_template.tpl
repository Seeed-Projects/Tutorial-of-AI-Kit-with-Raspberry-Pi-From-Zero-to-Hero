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
{% endblock output %}
