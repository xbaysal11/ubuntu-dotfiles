export ZSH="/home/xbaysal11/.oh-my-zsh"

# =_=_=_= THEMES =_=_=_=
ZSH_THEME="xbaysal11"
#ZSH_THEME="robbyrussell"

# =_=_=_= ZSH CONFIG =_=_=_=
ENABLE_CORRECTION="true"
HIST_STAMPS="dd.mm.yyyy"
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=241"
ZSH_AUTOSUGGEST_STRATEGY=(history completion)
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
#PROMPT='${ret_status} %{$fg[cyan]%}%c%{$reset_color%} '
 
# =_=_=_= PLUGINS =_=_=_=
plugins=(
  git
  zsh-syntax-highlighting
  zsh-autosuggestions
  sudo
)

source $ZSH/oh-my-zsh.sh

# =_=_=_= ALIASES =_=_=_=

### Terminal config
alias vim='nvim'
alias ls="colorls --group-directories-first"
alias h="history"
alias hg="history | grep "
alias ports="netstat -nlp"
alias p="cd ~/prog/ && cd"
alias mc='~/.config/polybar/scripts/macCommand.sh'
alias sai='sudo apt install'
alias dns='sudo sh -c "echo nameserver 8.8.8.8 > /etc/resolv.conf"; echo "DNS changed successfully"'
alias wclone='wget --limit-rate=200k -nc -k --random-wait -r -p -E -e robots=off -U mozilla'
alias lout='sudo pkill -u xbaysal11'
alias s='~/scripts/screenshot.sh'
alias f='~/scripts/fileshare.sh'

### Config files
alias zshrc="vim ~/.zshrc"
alias i3c="vim ~/.config/i3/config"
alias polybarc="vim ~/.config/polybar/"

### Devices 
alias wfc="nmcli dev wifi con"
alias wf="nmcli dev wifi "
alias devd="nmcli dev disconnect"
alias devc="nmcli dev connect"
alias wfoff='nmcli dev disconnect wlp3s0'
alias wfon='nmcli dev connect wlp3s0'
alias screen2='xrandr --output DP-1 --right-of eDP-1 --auto'
alias screen1='xrandr --auto'
alias ttl='sudo sysctl net.ipv4.ip_default_ttl=65;echo "TTL successfully changed to 65"'

### Git
alias rs="rails s"
alias ys="yarn start"
alias gI='git init'
alias gA="git add ."
alias gP="git push origin master"
alias gL="git pull origin master"
alias gC="gcmsg"
alias gCL="gcl"
alias gS="git status"
alias dt='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'

### SSH
alias splmlvpn="sudo openvpn ~/scripts/spalmalo.ovpn"
alias usavpn="sudo openvpn --config ~/scripts/usa.ovpn"
alias xvpn="sudo openvpn --config ~/scripts/xbaysal11.ovpn"
alias mgzssh="ssh root@10.0.0.35"
alias xssh='ssh root@10.0.0.37'
alias gssh='ssh root@35.245.175.101'
alias sshpub='cat ~/.ssh/id_rsa.pub'
alias sshprv='cat ~/.ssh/id_rsa'

# export PATH
export PATH=$PATH:~/.yarn/bin
export PATH=$PATH:~/.rvm/gems/ruby-2.6.3/bin
export PATH="${PATH}:${HOME}/.local/bin/"