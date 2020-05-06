# Be sure to restart your server when you modify this file.

# Add new inflection rules using the following format. Inflections
# are locale specific, and you may define rules for as many different
# locales as you wish. All of these examples are active by default:
ActiveSupport::Inflector.inflections(:en) do |inflect|
  inflect.clear
  inflect.singular(/$/i, '')
  inflect.acronym 'CLDIAG'
  inflect.acronym 'CLASSO'
  inflect.acronym 'CLCLAS'
  inflect.acronym 'CLATRI'
  inflect.acronym 'CLMETO'

  inflect.acronym 'CSDIAG'
  inflect.acronym 'CSELEM'
  inflect.acronym 'CSASSO'

  inflect.acronym 'MQDIAG'
  inflect.acronym 'MQELEM'
  inflect.acronym 'MQTRAN'
end
