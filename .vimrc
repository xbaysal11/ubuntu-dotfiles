set nocompatible
filetype off 
call plug#begin('~/.vim/plugged')
filetype plugin indent on 

" =============================================================================
" Plugins
" =============================================================================

Plug 'tpope/vim-fugitive'
Plug 'lokaltog/vim-easymotion'
Plug 'honza/vim-snippets'
"Plug 'ryanoasis/vim-devicons'
" ---- Airline ----
Plug 'vim-airline/vim-airline'
let g:airline#extensions#tabline#enabled = 1
let g:airline_section_y = ''
let g:airline_section_z = '%3l/%L:%3v'

" ---- Deoplete ----
"Plug 'Shougo/deoplete.nvim'
"let g:deoplete#enable_at_startup = 1
"let g:deoplete#enable_ignore_case = 1 
"let g:deoplete#auto_completion_start_length = 0
"let g:deoplete#file#enable_buffer_path = 1
" profile
"let g:deoplete#enable_profile = 1

" ---- ALE ----
Plug 'w0rp/ale'
let g:airline#extensions#ale#enabled = 1
let g:ale_linters = {
    \'javascript': ['eslint'],
    \'python': ['flake8', 'pylint'],
\}
let g:ale_fixers = {
            \'python': ['black'],
            \'javascript': ['prettier'],
            \'typescript': ['prettier'],
            \'json': ['prettier'],
            \'go': ['gofmt'],
            \}
let g:ale_fix_on_save = 1
map <C-A-L> :ALEFix<CR>
" ---- ignore files ----
"set wildignore=*.swp,*.bak,*.pyc,*.class,*.jar,*.gif,*.png,*.jpg,*.jpeg


Plug 'majutsushi/tagbar'
Plug 'Valloric/YouCompleteMe', { 'do': './install.py --tern-completer' }

" Start autocompletion after 4 chars
let g:ycm_min_num_of_chars_for_completion = 4
let g:ycm_min_num_identifier_candidate_chars = 4
let g:ycm_enable_diagnostic_highlighting = 0
" Don't show YCM's preview window [ I find it really annoying ]
set completeopt-=preview
let g:ycm_add_preview_to_completeopt = 0
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
Plug 'Xuyuanp/nerdtree-git-plugin'

"---- Buffkill ----
Plug 'qpkorr/vim-bufkill'
map <C-q> :BD<CR>

"---- Wakatime ----
Plug 'wakatime/vim-wakatime'

" ---- Python ----
Plug 'klen/python-mode'
Plug 'zchee/deoplete-jedi'
Plug 'plytophogy/vim-virtualenv'
let g:deoplete#sources#jedi#python_path = 'python3'
let g:pymode_python = 'python3'
let g:pymode_lint_on_write = 0
let g:pymode_rope = 0
let g:pymode_rope_completion = 0
let g:pymode_rope_complete_on_dot = 0
let g:pymode_rope_lookup_project = 0
let g:pymode_doc = 0
let g:pymode_doc_key = 'K'
let pymode_folding = 0

"function Py2()
  "  let g:pymode_python = 'python3'
 "   let g:deoplete#sources#jedi#python_path = 'python3'
"endfunction

" ---- Javascript ----
" Plug 'othree/yajs.vim'
Plug 'mxw/vim-jsx'
let g:jsx_ext_required = 0 " highlighting jsx syntax for .js files too
" vue
Plug 'posva/vim-vue'
" ternj
Plug 'ternjs/tern_for_vim', { 'do': 'npm install && npm install -g tern' }
Plug 'carlitux/deoplete-ternjs', { 'do': 'npm install -g tern' }

" ---- Typescript ----
Plug 'HerringtonDarkholme/yats.vim'
Plug 'mhartington/nvim-typescript'

" ---- JSON ----
Plug 'elzr/vim-json'

" ---- JSON ----
Plug 'mattn/emmet-vim'
"let g:user_emmet_install_global = 0
"autocmd FileType html,css EmmetInstall
let g:user_emmet_leader_key='<C-Z>'
" ---- GO ----
Plug 'fatih/vim-go'
Plug 'zchee/deoplete-go'

" ---- Themes ----
Plug 'sonph/onehalf'
Plug 'dracula/vim', { 'as': 'dracula' }
Plug 'altercation/vim-colors-solarized', { 'as': 'solarized' }
let g:solarized_termcolors=256
Plug 'morhetz/gruvbox'
set termguicolors
let g:gruvbox_italic=1

" ---- indentLine ----
Plug 'Yggdroot/indentLine'
let g:vim_json_syntax_conceal = 0

Plug 'MarcWeber/vim-addon-mw-utils'
Plug 'tomtom/tlib_vim'
Plug 'garbas/vim-snipmate'
Plug 'jiangmiao/auto-pairs'
Plug 'morhetz/gruvbox'
Plug 'scrooloose/nerdtree'
map <F3> :NERDTreeToggle<CR>
map <F4> :NERDTreeFind<CR>
let g:NERDTreeDirArrowExpandable = '▸'
let g:NERDTreeDirArrowCollapsible = '▾'

call plug#end()


set hlsearch
set incsearch
set number
set expandtab
set tabstop=4
syntax on
autocmd FileType css set omnifunc=csscomplete#CompleteCSS
autocmd FileType html set omnifunc=htmlcomplete#CompleteTags


"colorschemegruvbox
"set background=dark

"mappings



map <silent> <C-h> :call WinMove('h')<CR>
map <silent> <C-j> :call WinMove('j')<CR>
map <silent> <C-k> :call WinMove('k')<CR>
map <silent> <C-l> :call WinMove('l')<CR>


function! WinMove(key)
	let t:curwin = winnr()
	exec "wincmd ".a:key
	if (t:curwin == winnr())
		if (match(a:key, '[jk]'))
			wincmd v
		else
			wincmd s
		endif
		exec "wincmd ".a:key
	endif
endfunction
" NERDTress File highlighting

function! NERDTreeHighlightFile(extension, fg, bg, guifg, guibg)
 exec 'autocmd filetype nerdtree highlight ' . a:extension .' ctermbg='. a:bg .' ctermfg='. a:fg .' guibg='. a:guibg .' guifg='. a:guifg
 exec 'autocmd filetype nerdtree syn match ' . a:extension .' #^\s\+.*'. a:extension .'$#'
endfunction

call NERDTreeHighlightFile('jade', 'green', 'none', 'green', '#151515')
call NERDTreeHighlightFile('ini', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('md', 'blue', 'none', '#3366FF', '#151515')
call NERDTreeHighlightFile('yml', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('config', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('conf', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('json', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('html', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('styl', 'cyan', 'none', 'cyan', '#151515')
call NERDTreeHighlightFile('css', 'cyan', 'none', 'cyan', '#151515')
call NERDTreeHighlightFile('coffee', 'Red', 'none', 'red', '#151515')
call NERDTreeHighlightFile('js', 'Red', 'none', '#ffa500', '#151515')
call NERDTreeHighlightFile('php', 'Magenta', 'none', '#ff00ff', '#151515')
function! g:ChmodOnWrite()
  if v:cmdbang
    silent !chmod u+w %
  endif
endfunction

autocmd BufWrite * call g:ChmodOnWrite()

set guifont=Hack\ Nerd\ Font\ Regular\ 20


