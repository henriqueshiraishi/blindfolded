module ApplicationHelper
  def val_of(object, symbol)
    params[symbol] || object[symbol]
  end

  def options_from_enum_for_select(hash)
    hash.map { |i| [i[0].capitalize, i[0]] }
  end

  def date(value)
    if !value.nil?
      l value
    end
  end
end
