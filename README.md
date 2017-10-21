
# my_first_lamp

## 概要

以下のような構成のローカル開発環境を作ります
- 仮想マシンはLAMP環境です
- 仮想マシンはVirtualBox + Vagrant で構築し、ansible_localでプロビジョニングします
- ホストマシン上にはnode.jsを入れ、Gulpでのビルド自動実行環境、SASS環境を作ります
- プロジェクトはGitでバージョン管理します

![env](https://raw.githubusercontent.com/mokmokjp/my_first_lamp/master/docs/env.png "env")

===仮想マシン

| 分類 | 内容 |
|--|--|
|OS(VagrantBox)|[centos/7 Vagrant box](https://app.vagrantup.com/centos/boxes/7) v1708.01|
|Webサーバー|[Apache](http://httpd.apache.org/docs/2.4/ja/) v2.4.6|
|DBサーバー|[MariaDB](https://mariadb.com/kb/ja/mariadb/) v10.2.9|
|言語|[php](http://php.net/manual/ja/) v7.0.24|
|バージョン管理|[Git](https://git-scm.com/book/ja/v2) v2.14.1|
|CIツール|-|
|メモリ|2GB|
|ホスト名|my_first_lamp|
|IPアドレス|192.168.33.10|
|SSH|ユーザ名: Vagrant, パスワード: Vagrant|
|SSH|ユーザ名: root, パスワード: Vagrant|
|DBユーザ|ユーザ名: root, パスワード: `自分で設定`|
|DBユーザ|ユーザ名: `自分で設定`, パスワード: `自分で設定`|
|DB名|`自分で設定`|

===仮想マシンのプロビジョニング

| 分類 | 内容 |
|--|--|
|仮想化ソフト|[VirtualBox](https://www.virtualbox.org/wiki/Documentation) v5.1.28|
|仮想マシン構築|[Vagrant](https://www.vagrantup.com/docs/index.html) v2.0.0|
|インフラ構成管理|ansible_local, [Ansible](http://docs.ansible.com/ansible/latest/index.html) v2.3.2.0|

===ホストマシン

| 分類 | 内容 |
|--|--|
|OS|Windows10|
|[node.js](https://nodejs.org/ja/docs/)|v6.11.4|
|[npm](https://docs.npmjs.com)|v3.10.10|
|バージョン管理|[Git](https://git-scm.com/book/ja/v2) v2.14.1|
|node_modules(グローバル)|[gulp-cli](https://www.npmjs.com/package/gulp-cli)|
|その他ソフト|[Cygwin](https://cygwin.com/cygwin-ug-net.html) (ssh, rsync)|

node_modules(npmでプロジェクトルートにローカルインストール)
| 分類 | 内容 |
|--|--|
|[autoprefixer]()|v7.1.5|
|[babel-core]()|v6.26.0|
|[babel-preset-env]()|v1.6.1|
|[browserslist]()|v2.5.1|
|[gulp](https://github.com/gulpjs/gulp/blob/master/docs/API.md)|v3.9.1|
|[gulp-babel]()|v7.0.0|
|[gulp-postcss]()|v7.0.0|
|[gulp-sass](https://www.npmjs.com/package/gulp-sass)|v3.1.0|
|[gulp-sourcemaps]()|v2.6.1|

[autoprefixer, babelでサポートするブラウザ](http://browserl.ist/?q=last+1+Chrome+versions%2C+last+1+Firefox+versions%2C+last+1+Explorer+versions%2C+last+1+Edge+versions%2C+last+1+Safari+versions%2C+last+1+ios_saf+versions%2C+last+1+and_chr+versions%2C+last+1+Android+versions)
| ブラウザ | バージョン |
|--|--|
|Chrome|last 1 version|
|Firefox|last 1 version|
|Explorer|last 1 version|
|Edge|last 1 version|
|Safari|last 1 version|
|iOS Safari|last 1 version|
|Android Chrome|last 1 version|
|Android|last 1 version|

## 使い方(基本)

【1】Gitのインストール

1. ホストマシンに[Git(v2.14.1)](https://git-scm.com/downloads)をインストール。(参考: [Gitのインストール](docs/install_git.md))
2. ユーザー名とメールアドレスを、Gitにグローバル設定する
```sh
$ git config --global user.name "任意のユーザ名"
$ git config --global user.email "任意のメールアドレス"
```
3. UTF-8環境で、`ؚ$ git commit`や`$ git status`するとき、ؚ日本語ファイル名が数値エスケープされるのを回避するよう、Gitにグローバル設定する
```sh
$ git config --global core.quotepath false
```
4. 改行コードを自動変換しないように、Gitにグローバル設定する
```sh
$ git config --global core.autocrlf false
```

【2】仮想マシンを作るための準備

1. ホストマシンに[VirtualBox(v5.1.28)](https://www.virtualbox.org/wiki/Downloads)をインストール
2. ホストマシンに[Vagrant(v2.0.0)](https://www.vagrantup.com/downloads.html)をインストール
3. ホストマシンがWindowsの場合、[Cygwin](https://cygwin.com/install.html)のsshとrsyncをインストールし、CygwinにPATHを通す
4. PCの仮想化支援機能を有効にしておく。PCのメーカーごとによって操作や設定が違うので、各々調べて行ってください。
5. ホストマシンにプロジェクト用のディレクトリを作り、このリポジトリをgit cloneする
6. ホストマシンを再起動

【3】仮想マシンの設定
`Vagrantfile`を編集することで、仮想マシンの設定ができます。

- 仮想マシンのVirtualBoxでの名前、仮想マシンのホスト名を設定する
次のファイルを編集 `Vagrantfile`:
```text
v.name = "my.first.lamp"
```
```text
config.vm.hostname = "my.first.lamp"
```

【4】仮想マシン上のミドルウェアの設定
`./ansiblefiles`内のファイル(AnsiblePlaybook)を編集することで、仮想マシン上のミドルウェアの設定ができます。

- 仮想マシン上のDBユーザを設定する
次のファイルを編集 `./ansiblefiles/roles/db/tasks/main.yml`:
```yml
mysql_root_password: `pass_root`
mysql_user_first: `user_hoge`
mysql_password_first: `pass_piyo`
db_name_first: `db_name_fuga`
```

【5】仮想マシンの起動、プロビジョニング、終了など

| 目的 | コマンド |
|--|--|
|仮想マシンの起動|ホストマシンのプロジェクトルート(このリポジトリをクローンしたディレクトリ)に移動し、`$ vagrant up`コマンドを打つ。必要なVagrantBoxがホストマシンにインストールされ、仮想マシンが起動し、仮想マシン上のAnsibleがプロビジョニングを行う。初回時にはVagrantBoxのインストールと、プロビジョニングが行われるので時間がかかる。|
|仮想マシンの終了|ホストマシンのプロジェクトルートで、`$ vagrant halt`コマンドを打つ|
|仮想マシンの破棄|ホストマシンのプロジェクトルートで、`$ vagrant destroy`コマンドを打つ|
|仮想マシンのプロビジョニングを行う|ホストマシンのプロジェクトルートで、`$ vagrant provision`コマンドを打つ|
|ホストマシンのプロジェクトディレクトリ内のファイル変更を検知し、仮想マシン上の特定のディレクトリに一方向で同期させる|プロジェクトルートで、`$ vagrant rsync-auto`コマンドを打つ。なお、仮想マシンからホストマシンへのファイル同期はできない。|

【6】ホストマシンの環境を整える

1. ホストマシンに[node.js(v6.11.4)](https://nodejs.org/en/)をインストール。パッケージマネージャのnpmも一緒にインストールされる。node.jsにPATHが自動で通される。
2. ホストマシンを再起動
3. ホストマシンにnpmでgulp-cliをグローバルインストール
```sh
$ npm install --global gulp-cli
```
4. package.jsonファイルの内容に基づき、npmで必要なものをプロジェクトルートにローカルインストール。ホストマシンのプロジェクトルートで、以下コマンドを実行。
```sh
$ npm install
```

【7】gulpの設定、実行
`gulpfile.js`を編集することで、gulpの動作設定ができます。

| 目的 | コマンド |
|--|--|
|デフォルトのタスクを実行|ホストマシンのプロジェクトルートで、`$ gulp`コマンドを打つ|
|特定のtasknameを実行|ホストマシンのプロジェクトルートで、`$ gulp taskname`コマンドを打つ|
|監視系のタスクを終了|ホストマシンのプロジェクトルートで、`Ctrl + C`|

【8】開発
html/内のファイルを変更すると
- gulpのタスクが自動実行される
- rsync-autoで、ホストマシンのhtml/が、仮想マシンのvar/www/html/にアップロードされる

ブラウザで確認
- ホストマシンのブラウザで、「ホストマシンのローカルIPアドレス:8080」「localhost:8080」「192.168.33.10」にアクセスすると、html/index.htmlが表示される
- LAN内のモバイル端末などで、「ホストマシンのローカルIPアドレス:8080」にアクセスすると同じく表示される

WinSCPで仮想マシンに接続する場合
- 転送プロトコル: SFTP
- ホスト名: 192.168.33.10
- ユーザ名: vagrant
- パスワード: vagrant
- 設定>SSH>認証>秘密鍵: .vagrant/machines/default/virtualbox/private_keyを選択するとppk形式に変換されるので、それを指定する

## 使い方(応用)
【*】GitHubにgit pushしたら、Slackに通知する
1. Slackのアカウントを作成する
2. [https://my.slack.com/apps](https://my.slack.com/apps)にアクセスし、SlackにGitHubのインテグレーションを追加する。通知先のチャンネルを選択し、GitHubアカウントを選択する
3. GitHubのリポジトリとブランチを選択、Slackに通知したいイベントを選択する
4. 以上の設定で、GitHub上でイベントが発生時にSlackへ通知が飛ぶようになる

## このファイル・ディレクトリ何？
| ファイル・ディレクトリ | 内容 |
|--|--|
|.git/|Gitの情報を格納しているディレクトリ|
|.vagrant/|Vagrantが自動生成するディレクトリ|
|ansiblefiles/|AnsiblePlaybookを格納しているディレクトリ|
|docs/|my_first_lampのドキュメントを格納してるディレクトリ|
|html/|/var/www/html/(Webサーバーのルートディレクトリ)、にアップロードするディレクトリ|
|node_modules/|npmで、package.jsonをもとにローカルインストールしたnode.jsのpackageを格納しているディレクトリ|
|.gitignore|Gitでバージョン管理から除外するファイル・ディレクトリ、を記述するファイル|
|gulpfile.js|Gulpの動作を記述するファイル|
|package.json|node.jsのpackageを管理するためのファイル。autoprefixer, babelでサポートするブラウザもこのファイルに記述。|
|Vagrantfile|VagrantとVirtualBoxの設定を記述するファイル|

## トラブルシューティング

`$vagrant up`できない
- PCの仮想化支援機能を有効にする。

`$ vagrant rsync-auto`が動作しない
- Windowsではrsyncがデフォルトで使えないので、[Cygwin](https://cygwin.com/cygwin-ug-net.html)でrsyncをインストールしておく。
