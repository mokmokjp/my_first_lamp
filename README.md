
# my_first_lamp

## 概要

以下のような構成のローカル開発環境を作ります
- 仮想マシンはシンプルなLAMP環境です。VirtualBox + Vagrant + ansible_localでプロビジョニングします。
- ホストマシン上にはnode.jsを入れ、シンプルなSASS環境を作ります。

![env](https://raw.githubusercontent.com/mokmokjp/my_first_lamp/master/docs/env.png "env")

===仮想マシン

| 分類 | 内容 |
|--|--|
|OS(VagrantBox)|[centos/7](https://app.vagrantup.com/centos/boxes/7) v1708.01|
|Webサーバー|Apache v2.4.6|
|DBサーバー|MariaDB v10.2.9|
|言語|PHP v7.0.24|
|バージョン管理|[Git](https://git-scm.com/downloads)v2.14.1|
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
|仮想化ソフト|[ViatualBox](https://www.virtualbox.org/wiki/Downloads) v5.1.28|
|仮想マシン構築|[Vagrant](https://www.vagrantup.com/downloads.html) v2.0.0|
|インフラ構成管理|[ansible_local](https://www.vagrantup.com/docs/provisioning/ansible_local.html) Ansible v2.3.2.0|

===ホストマシン

| 分類 | 内容 |
|--|--|
|OS|Windows10|
|[node.js](https://nodejs.org/en/)|v6.11.4|
|[npm](https://www.npmjs.com)|v3.10.10|
|node_modules|全てプロジェクトルートにnpmでローカルインストール<br>[gulp](https://www.npmjs.com/package/gulp) v3.9.1<br>[gulp-sass](https://www.npmjs.com/package/gulp-sass) v3.1.0|
|バージョン管理|[Git](https://git-scm.com/downloads) v2.14.1|
|その他ソフト|[Cygwin](https://cygwin.com/install.html)|

## 使い方

【1】仮想マシンを作るための準備

1. ホストマシンに[VirtualBox(v5.1.28)](https://www.virtualbox.org/wiki/Downloads)をインストール
2. ホストマシンに[Vagrant(v2.0.0)](https://www.vagrantup.com/downloads.html)をインストール
3. ホストマシンがWindowsの場合、[Cygwin](https://cygwin.com/install.html)のsshとrsyncをインストールし、CygwinにPATHを通す
4. PCの仮想化支援機能を有効にしておく。PCのメーカーごとによって操作や設定が違うので、各々調べて行ってください。
5. ホストマシンに[Git(v2.14.1)](https://git-scm.com/downloads)をインストール
6. ホストマシンにプロジェクト用のディレクトリを作り、このリポジトリをgit cloneする
7. ホストマシンを再起動

【2】仮想マシンの設定
`Vagrantfile`を編集することで、仮想マシンの設定ができます。

- 仮想マシンのVirtualBoxでの名前、仮想マシンのホスト名を設定する
次のファイルを編集 `Vagrantfile`:
```text
v.name = "my.first.lamp"
```
```text
config.vm.hostname = "my.first.lamp"
```

【3】仮想マシン上のミドルウェアの設定
`./ansiblefiles`内のファイル(AnsiblePlaybook)を編集することで、仮想マシン上のミドルウェアの設定ができます。

- 仮想マシン上のDBユーザを設定する
次のファイルを編集 `./ansiblefiles/roles/db/tasks/main.yml`:
```yml
mysql_root_password: `pass_root`
mysql_user_first: `user_hoge`
mysql_password_first: `pass_piyo`
db_name_first: `db_name_fuga`
```

【4】仮想マシンの起動、プロビジョニング、終了など

| 目的 | コマンド |
|--|--|
|仮想マシンの起動|ホストマシンのプロジェクトルート(このリポジトリをクローンしたディレクトリ)に移動し、`$ vagrant up`コマンドを打つ。必要なVagrantBoxがホストマシンにインストールされ、仮想マシンが起動し、仮想マシン上のAnsibleがプロビジョニングを行う。初回時にはVagrantBoxのインストールと、プロビジョニングが行われるので時間がかかる。|
|仮想マシンの終了|ホストマシンのプロジェクトルートで、`$ vagrant halt`コマンドを打つ|
|仮想マシンの破棄|ホストマシンのプロジェクトルートで、`$ vagrant destroy`コマンドを打つ|
|仮想マシンのプロビジョニングを行う|ホストマシンのプロジェクトルートで、`$ vagrant provision`コマンドを打つ|
|ホストマシンのプロジェクトディレクトリ内のファイル変更を検知し、仮想マシン上の特定のディレクトリに一方向で同期させる|プロジェクトルートで、`$ vagrant rsync-auto`コマンドを打つ。なお、仮想マシンからホストマシンへのファイル同期はできない。|

【5】ホストマシンの環境を整える

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

【6】gulpの設定、実行
`gulpfile.js`を編集することで、gulpの動作設定ができます。

- gulp-sassの設定をする
`./html/css/*.scss`を変更すると、`.html/css/dest/`にSASSコンパイルされる設定になっています。

| 目的 | コマンド |
|--|--|
|デフォルトのタスクを実行|ホストマシンのプロジェクトルートで、`$ gulp`コマンドを打つ|
|特定のtasknameを実行|ホストマシンのプロジェクトルートで、`$ gulp taskname`コマンドを打つ|
|監視系のタスクを終了|ホストマシンのプロジェクトルートで、`Ctrl + C`|

## 解説

- .git/
- .vagrant/
- ansiblefiles/
- docs/
- html/
- node_modules/
- .gitignore
- gulpfile.js
- package.json
- Vagrantfile