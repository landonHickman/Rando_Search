# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Test.destroy_all
Topic.destroy_all
Page.destroy_all
Section.destroy_all

tvname = ['Scienfield', 'Big Bang Theory', 'How I Met Your Mother', 'The Office']

tv = Topic.create(topic_name: 'TV-Show')
science = Topic.create(topic_name: 'Science')
movies = Topic.create(topic_name: 'Movies')

5.times do
  page1 = tv.pages.create(page_title: tvname.sample, image: 'https://cdn.vox-cdn.com/thumbor/uTD2tCZl1OfZAMa2gVBGNcgHCgI=/0x0:3000x2000/1200x800/filters:focal(1260x760:1740x1240)/cdn.vox-cdn.com/uploads/chorus_image/image/60674505/lindbergh_tv_week_numbers.0.jpg')
  4.times do
    page1.sections.create(article_title: Faker::Lorem.word, body: Faker::Lorem.paragraph(sentence_count: 4))
  end
end

5.times do
  page2 = science.pages.create(page_title: Faker::Science.element_subcategory, image: 'https://static.scientificamerican.com/sciam/cache/file/9A6D13AC-D1F3-4279-A26DC146D439BF45_source.jpg?w=590&h=800&252A66F3-C2F7-4112-91933200E785DC8E')
  4.times do
    page2.sections.create(article_title: Faker::Lorem.word, body: Faker::Lorem.paragraph(sentence_count: 4))
  end
end

5.times do
  page3 = movies.pages.create(page_title: Faker::Movie.title, image: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg' )
  4.times do
    page3.sections.create(article_title: Faker::Lorem.word, body: Faker::Lorem.paragraph(sentence_count: 4))
  end
end

puts "seeded #{Topic.all.size} Topics"
puts "seeded #{Page.all.size} Pages"
puts "seeded #{Section.all.size} Sections"
