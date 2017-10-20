
# Gitのインストール

## Select Components
- Additional icons
    git bashのショートカットをどこに置くか
- Windows Explorer integration
    エクスプローラーで右クリックしたときにGit BashとGit GUIを表示させるかどうか。通常はオンでよい
- Git LFS(Large File Support)
    Git LFS(Gitで大容量ファイルを扱うためのextension)。通常はオンでよい
- Associate .git* configuration files with the default text editor
    .gitファイルをデフォルトのテキストエディタで開くかどうか。
- Associate .sh files to be run with Bash
    .shファイルをGit Bashで実行させるようにするかどうか。
- Use a TrueType font in all console windows
    オンにすると、Git Bash以外のコンソールでマルチバイト文字列が文字化けするので、必ずオフにする。
- Check daily for Git for Windows Updates
    Git for Windowsの更新を毎日チェックするかどうか

## Select Start Menu Folder
スタートメニューにGitを追加するかどうか
通常はそのままの設定でよい

## Adjusting your PATH environment
- Use Git from Git Bash only
    環境変数PATHに何も追加しない
- Use Git from the Windows Command Prompt
    環境変数PATHに「C:\Program Files\Git\cmd」を追加する
    通常はこれを選択する
- Use Git from the Windows Command Prompt|
    環境変数PATHに「C:\Program Files\Git\cmd, C:\Program Files\Git\mingw64\bin, C:\Program Files\Git\usr\bin」を追加する
    Unixコマンドがcmd.exe等でも使えるようになる

## Choosing HTTPS transport backend
- Use the OpenSSL library
    GitでHTTPSを使い`$git fetch`, `$git push`するときにOpenSSLを使用する
    通常はこれを選択する
- Use the native Windows Secure Channel library
    GitでHTTPSを使い`$git fetch`, `$git push`するときにWindowsのSecure Channelを使用する
    リモートリポジトリへのアクセスに、ルート証明書が必要なはこちらを選択する

## Configuring the line ending conversions
- Checkout Windows-style, commit Unix-style line endings
    チェックアウト時に改行コードを`CRLF`に変換し、コミット時に改行コードを`LF`に変換する
- Checkout as-is, commit Unix-style line endings
    チェックアウト時に改行コードを変換せず、コミット時に改行コードを`LF`に変換する
- Checkout as-is, commit as-is
    チェックアウト時に改行コードを変換せず、コミット時に改行コードを変換しない
    通常はこれを選択する

## Configuring the terminal emulator to use with Git Bash
- Use MinTTY (the default terminal of MSYS2)
    Git Bashで使うターミナルエミュレーターにMinTTYを使う
    通常はこれを選択する
- Use Windows' default console window
    Git Bashで使うターミナルエミュレーターにWindows標準のコンソール(cmd.exe)を使う

## Configuring extra options
- Enable file system caching
    PCのメモリに余裕がない場合はオフにする
- Enable Git Credential Manager
    Git Credential Managerを有効にするかどうか
    通常はオンにする
- Enable symbolic links
    シンボリックリンクを有効にするかどうか
    通常はオフにする