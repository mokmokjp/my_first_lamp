
# my_first_lamp

## 概要

以下のような構成のローカル開発環境を作ります
- 仮想マシンはシンプルなLAMP環境です。VirtualBox + Vagrant + ansible_localでプロビジョニングします。
- ホストマシン上にはnode.jsを入れ、シンプルなSASS環境を作ります。

===仮想マシン

| 分類 | 内容 |
|--|--|
|OS(VagrantBox)|[centos/7](https://app.vagrantup.com/centos/boxes/7) v1708.01|
|Webサーバー|Apache v2.4.6|
|DBサーバー|MariaDB v10.2.9|
|言語|PHP v7.0.24|
|その他ソフト|-|
|メモリ|2GB|
|ホスト名|my_first_lamp|
|IPアドレス|192.168.33.10|
|SSH|`パスなし`|
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
|node.js|-|
|Gulp|-|
|SASS|-|

## 使い方

【1】仮想マシンを作るための準備

1. ホストマシンに[VirtualBox(5.1.28)](https://www.virtualbox.org/wiki/Downloads)をインストール
2. ホストマシンに[Vagrant(2.0.0)](https://www.vagrantup.com/downloads.html)をインストール
3. ホストマシンがWindowsの場合、[Cygwin](Cygwin)のsshとrsyncをインストールし、CygwinにPATHを通す
4. PCの仮想化支援機能を有効にしておく。PCのメーカーごとによって操作や設定が違うので、各々調べて行ってください。
5. ホストマシンにGitをインストール
6. ホストマシンにプロジェクト用のディレクトリを作り、このリポジトリをgit cloneする
7. ホストマシンを再起動

【2】仮想マシンの操作

|仮想マシンの起動|ホストマシンのプロジェクトルート(このリポジトリをクローンしたディレクトリ)に移動し、`$ vagrant up`コマンドを打つ。必要なVagrantBoxがホストマシンにインストールされ、仮想マシンが起動し、仮想マシン上のAnsibleがプロビジョニングを行う。初回時にはVagrantBoxのインストールと、プロビジョニングが行われるので時間がかかる。|
|仮想マシンの終了|ホストマシンのプロジェクトルートで、`$ vagrant halt`コマンドを打つ|
|仮想マシンの破棄|ホストマシンのプロジェクトルートで、`$ vagrant destroy`コマンドを打つ|
|仮想マシンのプロビジョニングを行う|ホストマシンのプロジェクトルートで、`$ vagrant provision`コマンドを打つ|
|ホストマシンのプロジェクトディレクトリ内のファイル変更を検知し、仮想マシン上の特定のディレクトリに一方向で同期させる|プロジェクトルートで、`$ vagrant rsync-auto`コマンドを打つ。なお、仮想マシンからホストマシンへのファイル同期はできない。|

【3】仮想マシン上のミドルウェアの設定

- 仮想マシン上のDBユーザを設定する
次のファイルを編集 `ansiblefiles/roles/db/tasks/main.yml`:
```yml
mysql_root_password: `pass_root`
mysql_user_first: `user_hoge`
mysql_password_first: `pass_piyo`
db_name_first: `db_name_fuga`
```

【4】ホストマシンに必要なものを入れる

1. ホストマシンにnode.jsをインストール
2. ホストマシンにnpmでGulpをグローバルインストール
3. ホストマシンのプロジェクトルートで、npmで必要なものをローカルインストール
