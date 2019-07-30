require "json"
require "nokogiri"
require "openssl"
require "open-uri"

menu_pages = [
  { name: "drinks", url: "https://sandbarandislandgrill.com/menu/drinks-menu/" },
  { name: "food", url: "https://sandbarandislandgrill.com/menu/food-menu/" },
  { name: "kids", url: "https://sandbarandislandgrill.com/menu/kids-menu/" }
]

all_items = []

menu_pages.each do |menu_page|
  items = []
  page = Nokogiri::HTML(open(menu_page[:url], ssl_verify_mode: OpenSSL::SSL::VERIFY_NONE))
  menu_items = page.css(".fw-row")

  menu_items.each do |menu_item|
    name = menu_item.css("h5").text
    description = menu_item.css(".fw-col-sm-9 .fw-text-inner").text
    price = menu_item.css(".fw-col-sm-3 .fw-text-inner").text

    if !name.empty?
      items << {
        name: "#{name.split.each{|x| x.capitalize!}.join(' ')}",
        description: description.strip,
        price: price.strip
      }
    end
  end

  all_items << { menu_page[:name] => items }
  puts "#{items.count} #{menu_page[:name]} items found"
end

File.open("menu_items.json","w") do |f|
  f.write(JSON.generate(all_items))
end

puts "menu items written to menu_items.json yo! 💥"
