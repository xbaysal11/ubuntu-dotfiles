## Ruby and Rails Snippets for Visual Studio Code 
<p>
  <a href="https://marketplace.visualstudio.com/items?itemName=Cjay.ruby-and-rails-snippets">
    <img src="https://vsmarketplacebadge.apphb.com/version/Cjay.ruby-and-rails-snippets.svg">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=Cjay.ruby-and-rails-snippets">
    <img src="https://vsmarketplacebadge.apphb.com/installs/Cjay.ruby-and-rails-snippets.svg">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=Cjay.ruby-and-rails-snippets">
    <img src="https://vsmarketplacebadge.apphb.com/downloads-short/Cjay.ruby-and-rails-snippets.svg">
  </a>
</p>


Very similar to [Vense's rails extension](https://marketplace.visualstudio.com/items?itemName=Vense.rails-snippets) and [Peng Lv's snippets](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby) but with my own twists and added snippets :)

<a href="https://imgflip.com/gif/34pykn"><img src="https://i.imgflip.com/34pykn.gif" title="made at imgflip.com"/></a>

I plan to modify, extend and add more to this over time as I learn more about Ruby and Rails.

##### Supported file extensions

- Ruby (.rb)
- Embedded Ruby (html.erb)
- Slim (html.slim)

##### tips
1. `control/command + space` loads the snippet suggestions if they aren't shown right away.
2. `$1` is where the snippet starts. `$0` is where the snippet ends.
3. Press `tab` to move onto the next part of a snippet.
___
# --- Ruby  ---
#### [do] statement
```ruby
do
  $0
end
```
#### [if] statement 
```ruby
if $1
  $0
end
```
#### [else] statement 
```ruby
else
  $0
end
```
#### [ifelse] statement 
```ruby
if $1
  $2
else
  $0
end
```
#### [if elsif] statement 
```ruby
if $1
  $2
elsif $3
  $0
end
```
#### [if elsif else] statement 
```ruby
if $1
  $2
elsif
  $3
else
  $0
end
```
#### [first] statement 
```ruby
first(${quantity})
```
#### [find_by]
```ruby
find_by(${1:key}: ${2:value})
```
#### [find_by_params] find_by_params
```ruby
find_by(${1:id_name}: params[:${2:param}])
```
#### [where] where
```ruby
where(${condition})
```
#### [increment] increment 
```ruby
increment(:${1:id})
``` 
#### [order] order
```ruby
order(${1:column}: :${2:desc})
``` 
#### [limit] limit
```ruby
limit(${quantity})
``` 
#### [def] function
```ruby
def ${1:name}
  $2
end
```
#### [map] map function
```ruby
${1:array}.map { |${2:i}| $0}
```
#### [select] select function
```ruby
${1:array}.select { |${2:i}| $0}
```
#### [inject] inject function
```ruby
${1:array}.inject(${2:0}) { |{$3:acc}, ${4:i}| $0}
```
#### [all?] all? 
```ruby
${1:array}.all? {|${2:i}| $0}
```
#### [any?] any? 
```ruby
${1:array}.any? {|${2:i}| $0}
```
#### [begin] exception block
```ruby
begin
  $1
rescue => exception
  $0
end
```
#### [begin ensure] exception block with ensure
```ruby
begin
  $1
rescue => exception
  $2
ensure 
  $3
end
```
#### [begin else] exception block with else
```ruby
begin
  $1
rescue => exception
  $2
else
  $3
end
```
#### [begin else ensure] exception block with else and ensure
```ruby
begin
  $1
rescue => exception
  $2
else
  $3
ensure 
  $4
end
```
#### [class_initialize] create a class with empty initialize
```ruby
class ${1:ClassName}
  def initialize
    $0
  end
end
```
#### [cla1] Create a class and initialize 1 property 
```ruby
class ${1:ClassName}
  def initialize(${2:first})
    @${2:first} = ${2:first}
  end
  $0
end
```
#### [cla2] Create a class and initialize 2 properties 
```ruby
class ${1:ClassName}
  def initialize(${2:first}, ${3:second})
    @${2:first} = ${2:first}
    @${3:second} = ${3:second}
  end
  $0
end
```
#### [cla3] Create a class and initialize 3 properties 
```ruby
class ${1:ClassName}
  def initialize(${2:first}, ${3:second}, ${4:third})
    @${2:first} = ${2:first}
    @${3:second} = ${3:second}
    @${4:third} = ${4:third}
  end
  $0
end
```
#### [clex] Create a class that extends another
```ruby
class ${1:ClassName} < ${2:ParentClass}
  $0
end
```
#### [class] class definition
```ruby
class ${1:ClassName}
  $0
end
```
#### [for] simple for loop
```ruby
for ${1:value} in ${2:enumerable} do
  $0
end
```
#### [each] forEach loop
```ruby
${1:items}.each do |${2:item}|
  $0
end
```
#### [loop] forever loop
```ruby
loop do
  $0
end
```
#### [while] while loop
```ruby
while ${1:test}
  $0
end
```
#### [until] until loop
```ruby
until ${1:test}
  $0
end
```
#### [module] create a module definition
```ruby
module ${1:ModuleName}
  $0
end
```
#### [unless] unless
```ruby
unless ${1:test} 
  $0
end 
```
#### [unless else] unless
```ruby
unless ${1:test}
  $2
else 
  $3
end 
```
#### [rake] Create a rake task
```ruby
namespace :{1} do
  desc '$2',
  task $3: :environment do
    $4
  end
end
```
# --- Ruby on Rails / .rb ---
#### [only] 
```ruby
only: %i[${1:method}]
```
#### [except] 
```ruby
except: %i[${1:method}]
```
## Rails Routing
#### [get] get route 
```ruby
get '/${1:route}', to: '${2:controller}#${3:method}'
```
#### [post] post route
```ruby
post '/${1:route}', to: '${2:controller}#${3:method}'
```
#### [patch] patch route
```ruby
patch '/${1:route}', to: '${2:controller}#${3:method}'
```
#### [put] put route
```ruby
put '/${1:route}', to: '${2:controller}#${3:method}'
```
#### [delete] delete route
```ruby
delete '/${1:route}', to: '${2:controller}#${3:method}'
```
#### [res] resources
```ruby
resources :${res_name}
```
#### [resb] res_block
```ruby
resources :${1:res_name} do
  $2
end
```
#### [rescb] res_collection_block
```ruby
resources :${1:res_name} do
  collection do
    $2
  end
end
```
#### [resmember] res_member
```ruby
resources :${1:res_name} do
  member do
    $2
  end
end
```
#### [re] resources
```ruby
resource :${res_name}
```
#### [reb] res_block
```ruby
resource :${1:res_name} do
  $2
end
```
#### [recb] res_collection_block
```ruby
resource :${1:res_name} do
  collection do
    $2
  end
end
```
#### [re member] res_member
```ruby
resource :${1:res_name} do
  member do
    $2
  end
end
```
#### [member] member block
```ruby
member do
  $1
end
```
#### [collection] collection block
```ruby
collection do
  $1
end
```
## Redirect
#### [render] render path
```ruby
render $0
```
#### [redirect_to] redirect_to
```ruby
redirect_to ${1:path}
```
#### [redirect_to_msg] redirect_to with msg
```ruby
redirect_to ${path}, notice: '${msg}'
```
## Model
#### [has_one] has_one 
```ruby
has_one :$0
```
#### [dep] dependent
```ruby
dependent: :${1:id}
```
#### [has_one_dep] has_one_dependent
```ruby
has_one :${1:id}, dependent: :${2:type}
```
#### [has_many] has_many
```ruby
has_many :$0
```
#### [has_many_through] has_many_through
```ruby
has_many :${1:model1}, through: :${2:model2}
```
#### [has_many_dependent] has_many_dependent
```ruby
has_many :${1:id}, dependent: :${2:type}
```
#### [belongs_to] belongs_to
```ruby
belongs_to :
```
#### [belongs_to_cache] belongs_to_cache
```ruby
belongs_to :${1:id}, cache: ${2:true}
```
#### [has_and_belongs_to_many] belongs_to_cache
```ruby
has_and_belongs_to_many :${1:id}
```
## Columns
#### [add_column] add_column
```ruby
add_column :${1:table}, :${2:column}, :${3:type}
```
#### [add_reference] add_reference
```ruby
add_reference :${1:table}, :${2:column}, foreign_key: true
```
#### t.[x] table column property
`x = binary/boolean/date/datetime/decimal/float/integer/references/string/text/time/timestamp/timestamps`
## Params/Require
#### [params] params
```ruby
params.require(:${1:id_name}).permit(:${2:variable})
```
#### [para1/2/3] parameters
```ruby
params['$1']['$2']['$3']$0
```
#### [req] req
```ruby
require '$1'$0
```
#### [reqq] alternative req
```ruby
require(:$1)$0
```
#### [include] include
```ruby
include($1)$0
```
#### [permit] permit
```ruby
permit(${1:id});
```
## Controller
#### [controller] controller
```ruby
class ${1:Name}Controller < ApplicationController
  $2
end
```
#### [index] index method
```ruby
def index 
  $1
end 
```
#### [create] create method
```ruby
def create 
  $0
end 
```
#### [new] new method
```ruby
def new 
  $0
end 
```
#### [edit] edit method
```ruby
def edit 
  $0
end 
```
#### [show] show method
```ruby
def show 
  $0
end 
```
#### [update] update method
```ruby
def update 
  $0
end 
```
#### [destroy] destroy method
```ruby
def destroy 
  $0
end 
```
#### [crud] full crud
```ruby
def index
end 
def new  
end
def create
end
def edit
end
def update
end
def show
end
def destroy
end
```
#### [before_action] before_action
```ruby
before_action :${1:id}
```
# --- html.erb / html.slim --- 
#### [pre] template exec tag `<% %>`
```javascript
<% $1 %>
```
#### [pe] template render tag `<%= %>`
```javascript
<%= $1 %>
```
#### [preb] template exec tag block `<%`
```javascript
<% $1 %>
  $0
<% end %>
```
#### [peb] template render tag block `<%=`
```javascript
<%= $1 %>
  $0
<% end %>
```
#### [each] forEach loop
```javascript
<% ${1:items}.each do |${2:item}| %>
  $0
<% end %>
```
#### [form_for] form_for
```javascript
<%= form_for ${1:variable} do |${2:f}| %>
  $0
<% end %>
```
#### [timezone] select time zone 
```javascript
<%= f.time_zone_select :${1:id_name} %>
```
#### [rangefield] range_field
```javascript
<%= range_field (:${1:model_name}, :${2:id_name}, in: ${3:1..100}) %>
```
#### [selecttag] select_tag
```javascript
<%= select_tag (:${1:id_name}, options_for_select(${2:options}))%>
```
#### [colorfield] color_field
```javascript
<%= color_field :${$1:id_name} %>
```
#### [options_for_select] options_for_select
```ruby
options_for_select([${1:options}])$0 
```
#### [render] render
```javascript
<%= render ${1:path} %>$0 
```
#### [rendervar] render variable
```javascript
<%= render ${1:path}, ${2:var1}: ${3:var2} %>
```
#### [lt] link_to
```javascript
<%= link_to '${1:text}', ${2:path} %>
```
#### [ltc] link_to_class
```javascript
<%= link_to '${1:text}', ${2:path}, class:'${3:class}' %>
```
#### [ltmd] link_to_method_data
```javascript
<%= link_to '${1:link_text}', ${2:path}, method: '${3:method}', data:{ ${4:data} } %>
```
#### [ltmdc] link_to_method_data_class
```javascript
<%= link_to '${1:link_text}', ${2:path}, method: '${3:method}', data:{ ${4:data} }, class:'${5:class}' %>
```
#### [ltmcon] link_to_method_confirm
```javascript
<%= link_to \"${1:link_text}\", ${2:path}, method: \"${3:method}\", data:{ confirm: \"${4:confirm}\"} %>
```
#### [ltmconc] link_to_method_confirm_class
```javascript
<%= link_to \"${1:link_text}\", ${2:path}, method: \"${3:method}\", data:{ confirm: \"${4:confirm}\"}, class:\"${5:class}\" %>
```
#### [submit] submit
```javascript
<%= f.submit %>$0
```
#### [label] label
```javascript
<%= f.label :${1:id_name}, '${2:text}' %>$0
```
#### [numberfield] number_field
```javascript
<%= f.number_field (:${1:id_name}, in: ${2:1.0..20.0}, step: ${3:0.5}) %>$0
```
#### [timefield] time_field
```javascript
<%= f.time_field :${1:id_name} %>
```
#### [hiddenfield] hidden_field
```javascript
<%= f.hidden_field :${1:id_name} %>
```
#### [emailfield] email_field
```javascript
<%= f.hidden_field :${1:id_name} %>
```
#### [urlfield] url_field
```javascript
<%= f.url_field :${id_name} %>
```
#### [passwordfield] password_field
```javascript
<%= f.password_field :${id_name} %>
```
#### [textarea] text_area
```javascript
<%= f.text_area :${id_name} %>
```
#### [checkbox] check_box
```javascript
<%= f.check_box :${id_name} %>
```
#### [textfield] text_field
```javascript
<%= f.text_field :${id_name} %>
```
#### [datefield] date_field
```javascript
<%= f.date_field :${id_name} %>
```
#### [datetime_field] datetime_field
```javascript
<%= f.datetime_field :${1:id_name} %>
```
#### [radiobutton] radio_button
```javascript
<%= f.radio_button :${1:name}, :value => '${2:value}' %>
```
#### [input] input
```javascript
<%= f.input :${1:id}, label: '${2:text}' %>
```
#### [path] path
```ruby
${1:path}_path
```
#### [newpath] new_path
```ruby
new_${1:path}_path
```
#### [editpath] edit_path
```javascript
edit_${1:path}_path(${2:variable})
```
#### [if] if statement 
```javascript
<% if $1 %>
  $2
<% end %>
```
#### [else] else
```javascript
<% else %>
```
#### [elsif] elsif
```javascript
<% elsif $1 %>$0
```
#### [ifelse] if else statement 
```javascript
<% if $1 %>
  $2
<% else %>
  $3
<% end %>
```
#### [if elsif]
```javascript
<% if $1 %>
  $2
<% elseif %>
  $3
<% end %>
```
#### [if elsif else]
```javascript
<% if $1 %>
  $2
<% elseif %>
  $3
<% else %>
  $4
<% end %>
```
#### [unless] unless
```javascript
<% unless ${1:falsevalue} %>
  $2
<% end %>
```
#### [unless else] unless
```javascript
<% unless ${1:falsevalue} %>
  $2
<% else %>
  $3
<% end %>
```
#### [%end] end
```javascript
<% end %>
```
___
# --- Other ---
#### [frozenstring] 
```ruby
# frozen_string_literal_true
```
#### [rbprettier] bundle exec rbprettier --write '**/*.rb'
1. Add `gem 'prettier'` to your gemfile
2. Run `bundle` in your terminal
3. Optionally create a `.prettierrc` file for configuration in the root of your project directory. [here's a link to the repo for rb prettier](https://github.com/prettier/plugin-ruby)
4. Copy and paste this snippet into your terminal
```ruby
bundle exec rbprettier --write '**/*.rb'
```

#### [gitbashssh] enter into gitbash to avoid re-entering your password on pushes  
```
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
```
1. Copy and paste these two lines into your terminal
2. Push to your repository without entering your password 

# License - MIT