set nocompatible
filetype off 
call plug#begin()
filetype plugin indent on     " обязательно!

" =============================================================================
" Plugins
" =============================================================================

Plug 'tpope/vim-fugitive'
Plug 'lokaltog/vim-easymotion'
Plug 'floobits/floobits-neovim'
Plug 'ryanoasis/vim-devicons'
" ---- NerdTree ----
Plug 'scrooloose/nerdtree'
let NERDTreeIgnore=['\~$', '\.pyc$', '\.pyo$', '\.class$', 'pip-log\.txt$','\.o$']
map <F3> :NERDTreeToggle<CR>
map <F4> :NERDTreeFind<CR>
let g:NERDTreeDirArrowExpandable="+"
let g:NERDTreeDirArrowCollapsible="~"
" ---- Airline ----
Plug 'vim-airline/vim-airline'
let g:airline#extensions#tabline#enabled = 1
let g:airline_section_y = ''
let g:airline_section_z = '%3l/%L:%3v'

" ---- Deoplete ----
Plug 'Valloric/YouCompleteMe', { 'do': './install.py' }
let g:ycm_show_diagnostics_ui = 0
map <leader>jd :YcmCompleter GoTo<CR>

" ---- ALE ----
Plug 'w0rp/ale'
let g:airline#extensions#ale#enabled = 1
let g:ale_linters = {
    \'javascript': ['eslint'],
    \'typescript': ['tslint'],
    \'python': ['flake8'],
\}
let g:ale_fixers = {
            \'python': ['black'],
            \'javascript': ['prettier'],
            \'typescript': ['prettier'],
            \'ts': ['prettier'],
            \'json': ['prettier'],
            \'go': ['gofmt'],
            \}
let g:ale_fix_on_save = 1
map <C-A-L> :ALEFix<CR>
" ---- ale ignore files ----
set wildignore=*.swp,*.bak,*.pyc,*.class,*.jar,*.gif,*.png,*.jpg,*.jpeg



" ---- Surround ----
Plug 'tpope/vim-surround'

"---- FZF ----
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
map <c-p> :FZF<CR>
map <c-b> :Buffers<CR>
map <c-t> :Tags<CR>

"---- Multiple cursour ----
Plug 'terryma/vim-multiple-cursors'
function! Multiple_cursors_before()
    let b:deoplete_disable_auto_complete = 1
endfunction

function! Multiple_cursors_after()
    let b:deoplete_disable_auto_complete = 0
endfunction

"---- Nerd commenter ----
Plug 'scrooloose/nerdcommenter'

"---- Git ----
Plug 'airblade/vim-gitgutter'
"Plug 'Xuyuanp/nerdtree-git-plugin'

"---- Buffkill ----
Plug 'qpkorr/vim-bufkill'
map <C-q> :BD<CR>

"---- Wakatime ----
" Plug 'wakatime/vim-wakatime'

" ---- CSS ----
Plug 'hail2u/vim-css3-syntax'

" ---- Python ----

" ---- Javascript ----
" Plug 'othree/yajs.vim'
Plug 'mxw/vim-jsx'
let g:jsx_ext_required = 0 " highlighting jsx syntax for .js files too
" vue
" Plug 'posva/vim-vue'
" ternj

" ---- Styled-components ----
Plug 'styled-components/vim-styled-components', { 'branch': 'main' }

" ---- Typescript ----
Plug 'Quramy/tsuquyomi'
Plug 'leafgarland/typescript-vim'

" ---- JSON ----
Plug 'elzr/vim-json'

" ---- EMMET ----
Plug 'mattn/emmet-vim'

" ---- GO ----
Plug 'fatih/vim-go'
let g:go_version_warning = 0

" ---- Themes ----
Plug 'sonph/onehalf'
Plug 'dracula/vim', { 'as': 'dracula' }
Plug 'altercation/vim-colors-solarized', { 'as': 'solarized' }
Plug 'muellan/am-colors'
let g:solarized_termcolors=256
Plug 'morhetz/gruvbox'
set termguicolors
let g:gruvbox_italic=1

" ---- Font ----
if !has("gui_running")
set guifont=Hack\ Regular\ Nerd\ Font\ Complete\ 11
endif
let g:airline_powerline_fonts=1
let g:airline_powerline_fonts=1
let g:webdevicons_enable = 1
let g:webdevicons_enable_nerdtree = 1
let g:webdevicons_conceal_nerdtree_brackets = 0
" set guifont=Droid\ Sans\ Mono\ for\ Powerline\ Plus\ Nerd\ File\ Types:h11
" set guifont=Inconsolata\ for\ Powerline:h15
set encoding=utf-8
" ---- Icons ----
Plug 'ryanoasis/vim-devicons'
" ---- indentLine ----
Plug 'Yggdroot/indentLine'
let g:vim_json_syntax_conceal = 0

" Close Vim-Plug
call plug#end()

let mapleader=","
set hidden
set number
set backspace=indent,eol,start
set mousemodel=popup
set hlsearch
set autoindent noexpandtab tabstop=4 shiftwidth=4
set laststatus=2
" ---- Hotkeys ----
map <C-l> <C-w><Right>
map <C-h> <C-w><Left>
map <C-K> :bnext<CR>
map <C-J> :bprev<CR>
" ---- Mouse ----
set mouse=a
set clipboard=unnamedplus
" ---- Folding ----
set foldmethod=syntax
set foldlevelstart=128
set foldcolumn=0
set encoding=utf8

" ---- Functions TABS ----
function! TabWidth4()
    set expandtab " spaces instead of tabs 
    set tabstop=4 " ширина табуляции
    set softtabstop=4 " ширина таба при использовании всесто него пробелов
    set shiftwidth=4 " ширина таба при использовании всесто него пробелов
endfunction

function! TabWidth2()
    set expandtab " spaces instead of tabs 
    set tabstop=2 " ширина табуляции
    set softtabstop=2 " ширина таба при использовании всесто него пробелов
    set shiftwidth=2 " ширина таба при использовании всесто него пробелов
endfunction
call TabWidth4()

" ---- Functions THEMES ----
function! ThDracula()
    colorscheme dracula
    let g:airline_theme='dracula'
    set background=dark
endfunction

function! ThGruvL()
    colorscheme gruvbox
    let g:airline_theme='gruvbox'
    set background=light
endfunction

function! ThGruvD()
    colorscheme gruvbox
    let g:airline_theme='gruvbox'
    set background=dark
endfunction

function! ThAmpresent()
    colorscheme ampresent
    let g:airline_theme='gruvbox'
    set background=light
endfunction

call ThDracula()

" ---- Functions ALE ----
function! ALEShowListEnable()
    let g:ale_open_list = 1
    let g:ale_keep_list_window_open = 0
endfunction

function! ALEShowListDisable()
    let g:ale_open_list = 0
    let g:ale_keep_list_window_open = 0
endfunction
call ALEShowListDisable()
if exists("g:loaded_webdevicons")
  call webdevicons#refresh()
endif
